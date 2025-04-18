<template>
  <div class="iframe-container" ref="container">
    <div class="fullscreen-btn" v-show="!isFullscreen" @click="toggleFullscreen">
      <svg focusable="false" data-icon="fullscreen" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896">
        <path d="M290 236.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0013.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 000 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 00-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z"></path>
      </svg>
    </div>
    <iframe :src="fullUrl" frameborder="0" class="iframe-content"></iframe>
  </div>
</template>

<script>
export default {
  name: 'IframePage',
  props: {
    baseUrl: {  // 接收基础URL
      type: String,
      required: true
    },
    pathParam: {  // 接收路径参数
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isFullscreen: false
    }
  },
  computed: {
    fullUrl() {
      return this.pathParam 
        ? `${this.baseUrl}/${this.pathParam}`
        : this.baseUrl;
    }
  },
  mounted() {
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange);
  },
  beforeDestroy() {
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange);
  },
  methods: {
    handleFullscreenChange() {
      this.isFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
    },
    toggleFullscreen() {
      const container = this.$refs.container;
      if (!this.isFullscreen) {
        if (container.requestFullscreen) {
          container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
          container.webkitRequestFullscreen();
        } else if (container.mozRequestFullScreen) {
          container.mozRequestFullScreen();
        } else if (container.msRequestFullscreen) {
          container.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }
  }
}
</script>

<style scoped>
.iframe-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.iframe-content {
  width: 100%;
  height: 100%;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
}

.fullscreen-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1000;
  cursor: pointer;
  transition: all 0.3s;
  padding: 8px;
}

.fullscreen-btn:hover {
  transform: scale(1.1);
}

.fullscreen-btn svg {
  width: 20px;
  height: 20px;
  color: #666;
}

.fullscreen-btn:hover svg {
  color: #333;
}
</style>
