<template>
  <div>
    <nav>
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <button class="page-link" @click="onPreviousPage">Previous</button>
        </li>
        <li v-else class="page-item disabled">
          <p class="page-link">Previous</p>
        </li>
        <li v-if="currentPage !== lastPage" class="page-item">
          <button class="page-link" @click="onNextPage">Next</button>
        </li>
        <li v-else class="page-item disabled">
          <p class="page-link">Next</p>
        </li>
        <li v-if="currentPage !== lastPage" class="page-item">
          <button class="page-link" @click="onLastPage">Last</button>
        </li>
        <li v-else class="page-item disabled">
          <p class="page-link">Last</p>
        </li>
        <li v-for="index in lastPage" :key="index" class="page-item">
          <button
            v-if="currentPage !== index"
            class="page-link"
            @click="onPageNumClick(index)"
          >{{ index }}</button>
          <div v-else class="page-item disabled">
            <p class="page-link">{{ index }}</p>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "MoviePagination",
  props: {
    firstPage: {
      required: true
    },
    lastPage: {
      required: true
    },
    currentPage: {
      required: true
    }
  },
  methods: {
    onPreviousPage() {
      this.$emit("go-previous-page");
    },
    onLastPage() {
      this.$emit("go-last-page");
    },
    onNextPage() {
      this.$emit("go-next-page");
    },
    onPageNumClick(page) {
      this.$emit("go-page-num", page);
    }
  }
};
</script>

<style scoped>
.pagination {
  margin-top: 5vw;
}
</style>
