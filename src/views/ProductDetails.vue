<template>
  <div class="product-details">
    <img :src="product?.image" alt="Product Image" class="product-image" />

    <div class="info">
      <h1>{{ product?.title }}</h1>
      <p class="rating">⭐ {{ product?.rating.rate }}</p>
      <p class="price">$ {{ product?.price.toFixed(2) }}</p>
      <p class="description">{{ product?.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { type Product } from '../Types/Product';
import { dummyData } from '../Types/Product';
export default defineComponent({
  name: 'ProductDetails',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      product: undefined as Product | undefined,
    };
  },
   created() {
    const product  = dummyData.find((product) => product.id === parseInt(this.id));
    if (!product) {
      this.$router.push({ name: 'NotFound' });
    }else{
      this.product = product;
    }

   }
});
</script>

<style scoped>
.product-details {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  flex-wrap: wrap;
}

.product-image {
  max-width: 300px;
  width: 100%;
  border-radius: 8px;
}

.info {
  max-width: 500px;
}

.price {
  font-size: 1.5rem;
  color: #1a202c;
  margin: 0.5rem 0;
}

.rating {
  color: #ffa500;
  margin-bottom: 1rem;
}

.description {
  color: #555;
  line-height: 1.6;
}
</style>
