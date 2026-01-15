/**
 * Utilitários para busca avançada e filtros
 */

class SearchManager {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.currentResults = [];
        this.filteredResults = [];
        this.currentPage = 1;
        this.resultsPerPage = 12;
        this.filters = {
            category: '',
            city: '',
            sortBy: 'relevance',
            minRating: 0,
            maxPrice: Infinity,
            plan: 'all'
        };
    }

    /**
     * Buscar negócios com critérios
     */
    async search(query, filters = {}) {
        try {
            // Mesclar filtros
            this.filters = { ...this.filters, ...filters };

            // Chamada à API
            let url = `${this.apiUrl}/businesses?search=${encodeURIComponent(query)}`;
            
            if (this.filters.category) {
                url += `&category=${this.filters.category}`;
            }
            if (this.filters.city) {
                url += `&city=${this.filters.city}`;
            }

            const res = await fetch(url);
            const data = await res.json();

            this.currentResults = Array.isArray(data) ? data : [];
            this.applyFilters();
            return this.filteredResults;
        } catch (err) {
            console.error('Erro na busca:', err);
            return [];
        }
    }

    /**
     * Aplicar filtros locais aos resultados
     */
    applyFilters() {
        let results = [...this.currentResults];

        // Filtro por rating
        results = results.filter(b => (b.rating || 0) >= this.filters.minRating);

        // Filtro por plano
        if (this.filters.plan !== 'all') {
            results = results.filter(b => b.plan === this.filters.plan);
        }

        // Ordenação
        switch (this.filters.sortBy) {
            case 'rating':
                results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'newest':
                results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'featured':
                results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
            default: // relevance
                // Já vem ordenado por padrão
                break;
        }

        this.filteredResults = results;
        this.currentPage = 1;
    }

    /**
     * Obter página de resultados
     */
    getPage(page = 1) {
        const start = (page - 1) * this.resultsPerPage;
        const end = start + this.resultsPerPage;
        return this.filteredResults.slice(start, end);
    }

    /**
     * Obter informações de paginação
     */
    getPaginationInfo() {
        const totalPages = Math.ceil(this.filteredResults.length / this.resultsPerPage);
        return {
            currentPage: this.currentPage,
            totalPages,
            hasNextPage: this.currentPage < totalPages,
            hasPrevPage: this.currentPage > 1,
            totalResults: this.filteredResults.length
        };
    }

    /**
     * Ir para página anterior
     */
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            return this.getPage(this.currentPage);
        }
        return [];
    }

    /**
     * Ir para próxima página
     */
    nextPage() {
        const totalPages = Math.ceil(this.filteredResults.length / this.resultsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            return this.getPage(this.currentPage);
        }
        return [];
    }

    /**
     * Atualizar filtro e recarregar resultados
     */
    updateFilter(filterName, value) {
        this.filters[filterName] = value;
        this.applyFilters();
        return this.getPage(1);
    }
}

/**
 * Utilitários para lazy loading
 */
class LazyLoader {
    constructor(options = {}) {
        this.imageElements = [];
        this.options = {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '50px'
        };
        this.initObserver();
    }

    initObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        this.observer.unobserve(img);
                    }
                }
            });
        }, this.options);
    }

    /**
     * Registrar imagens para lazy loading
     */
    registerImages(imageElements) {
        imageElements.forEach(img => {
            if (img.dataset.src) {
                this.imageElements.push(img);
                this.observer.observe(img);
            }
        });
    }

    /**
     * Registrar elemento único
     */
    registerImage(imageElement) {
        if (imageElement && imageElement.dataset.src) {
            this.imageElements.push(imageElement);
            this.observer.observe(imageElement);
        }
    }

    /**
     * Limpar observer
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

/**
 * Utilitários para cache de dados
 */
class CacheManager {
    constructor(prefix = 'vivacidade_', ttl = 3600000) { // 1 hora por padrão
        this.prefix = prefix;
        this.ttl = ttl;
    }

    /**
     * Salvar item no cache
     */
    set(key, value) {
        const item = {
            value,
            timestamp: Date.now()
        };
        localStorage.setItem(this.prefix + key, JSON.stringify(item));
    }

    /**
     * Obter item do cache
     */
    get(key) {
        const item = localStorage.getItem(this.prefix + key);
        if (!item) return null;

        const parsed = JSON.parse(item);
        if (Date.now() - parsed.timestamp > this.ttl) {
            localStorage.removeItem(this.prefix + key);
            return null;
        }

        return parsed.value;
    }

    /**
     * Limpar item do cache
     */
    remove(key) {
        localStorage.removeItem(this.prefix + key);
    }

    /**
     * Limpar todo o cache
     */
    clear() {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }
        });
    }
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.SearchManager = SearchManager;
    window.LazyLoader = LazyLoader;
    window.CacheManager = CacheManager;
}
