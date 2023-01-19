<template>
  <div v-cloak>
    <a-modal
      :visible="showModal.visible"
      :title="tempObj.username"
      :footer="null"
      @cancel="handleCancel"
    >
      <img
        :alt="tempObj.avatar_url"
        style="width: 100%"
        :src="require('../../assets/images/' + tempObj.avatar_url)"
      />
    </a-modal>
  </div>
</template>

<script>
export default {
  props: ['modal', 'temp'],
  data () {
    return {
      showModal: {},
      tempObj: {}
    }
  },
  watch: {
    modal: {
      handler () {
        this.showModal = this.modal
      },
      deep: true,
      immediate: true
    },
    temp (n) {
      this.tempObj = n
    }
  },
  methods: {
    handleCancel () {
      this.showModal.visible = false
    }
  }
}
</script>
