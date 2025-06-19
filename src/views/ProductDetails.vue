<template>
  <div class="productDetails">
    <img :src="product?.image" alt="Product Image" class="productDetails__image" />

    <div class="productDetails__info">
      <h1>{{ product?.title }}</h1>
      <p class="productDetails__rating">⭐ {{ product?.rating.rate }}</p>
      <p class="productDetails__price">$ {{ product?.price.toFixed(2) }}</p>
      <p class="productDetails__description">{{ product?.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { dummyData, type Product } from '../types/product';
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
.productDetails {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  flex-wrap: wrap;
}

.productDetails__image {
  max-width: 300px;
  width: 100%;
  border-radius: 8px;
}

.productDetails__info {
  max-width: 500px;
}

.productDetails__price {
  font-size: 1.5rem;
  color: #1a202c;
  margin: 0.5rem 0;
}

.productDetails__rating {
  color: #ffa500;
  margin-bottom: 1rem;
}

.productDetails__description {
  color: #555;
  line-height: 1.6;
}
</style>
