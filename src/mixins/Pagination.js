export var paginationMixin = {
  computed: {
    firstPage() {
      return this.allMovies.first_page;
    },
    lastPage() {
      return this.allMovies.last_page;
    },
    currentPage() {
      return this.allMovies.current_page;
    }
  },
  methods: {
    goNextPage() {
      if (this.currentPage == this.lastPage) {
        return;
      }
      if (this.genreSelected.length) {
        this.fetchAllMovies({
          page: this.currentPage + 1,
          searchTerm: this.toSearch,
          genre: this.genreSelected
        });
        return;
      }
      this.fetchAllMovies({
        page: this.currentPage + 1,
        searchTerm: this.toSearch
      });
    },
    goPreviousPage() {
      if (this.currentPage == 1) {
        return;
      }
      if (this.genreSelected.length) {
        this.fetchAllMovies({
          page: this.currentPage - 1,
          searchTerm: this.toSearch,
          genre: this.genreSelected
        });
        return;
      }
      this.fetchAllMovies({
        page: this.currentPage - 1,
        searchTerm: this.toSearch
      });
    },
    goLastPage() {
      if (this.currentPage == this.lastPage) {
        return;
      }
      if (this.genreSelected.length) {
        this.fetchAllMovies({
          page: this.lastPage,
          searchTerm: this.toSearch,
          genre: this.genreSelected
        });
        return;
      }
      this.fetchAllMovies({ page: this.lastPage, searchTerm: this.toSearch });
    },
    goPageNum(page) {
      if (this.genreSelected.length) {
        this.fetchAllMovies({
          page: page,
          searchTerm: this.toSearch,
          genre: this.genreSelected
        });
        return;
      }
      this.fetchAllMovies({ page: page, searchTerm: this.toSearch });
    }
  }
};
