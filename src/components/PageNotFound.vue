<template>
  <div class="p-5">
    <a-result status="404" title="404" :sub-title="$t('notFoundTitle')">
      <template #extra>
        <a-button type="primary" @click="backHome">
          {{ $t('backHome') }}
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
export default {
  methods: {
    backHome () {
      this.$router.push('/home/records')
    }
  }
}
</script>
