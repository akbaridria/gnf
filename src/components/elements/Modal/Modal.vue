<template>
  <div id="open-modal-sell" class="modal-window">
    <div>
      <a href="#" title="Close" id="close-modal-sell" class="modal-close"
        >Close</a
      >
      <div class="wrapper-sell">
        <Typography variant="large-text" color="white">
          Sell this Nft For
        </Typography>
        <input
          class="input-number"
          type="number"
          @input="getSellNumber($event.target.value)"
        />
        <div class="button-wrapper" @click="submitAndSell">
          <GradientText :text="`Submit`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Typography from "@/components/elements/Typography/Typography.vue";
import GradientText from "@/components/fragments/GradientText/GradientText.vue";
export default {
  name: "Modal",
  components: {
    Typography,
    GradientText,
  },
  data: function () {
    return {
      priceSell: 0,
    };
  },
  methods: {
    getSellNumber(value) {
      this.$data.priceSell = value;
    },
    submitAndSell() {
      if (parseInt(this.$data.priceSell) === 0 || this.$data.priceSell === "") {
        this.$emit("errorNumber", {
          variant: "danger",
          alertText: "Error",
          description: "Please enter the price to sell!",
        });
      } else {
        this.$emit("submitAndSell", this.$data.priceSell);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/abstract/_variables.scss";

.button-wrapper {
  display: flex;
  justify-content: center;
  padding: 6px 0px;
  background-color: $gray-23;
  border-radius: 12px;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: $gray-22;
  }
}

.wrapper-sell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 12px;
  & > * {
    margin: 8px 0px;
  }
}
.input-number {
  width: 100%;
  padding: 12px 12px;
  color: white;
  border-radius: 12px;
  background-color: $gray-22;
  border: none;
  &:focus {
    outline: none;
  }
}
.modal-window {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.75);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
  width: 100vw;
  height: 100vh;
  &:target {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
  }
  & > div {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
    background: $gray-24;
  }
  header {
    font-weight: bold;
  }
  h1 {
    font-size: 150%;
    margin: 0 0 15px;
  }
}

.modal-close {
  color: $gray-8;
  line-height: 50px;
  font-size: 80%;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  text-decoration: none;
  &:hover {
    color: $white;
  }
}

/* Demo Styles */

a {
  color: inherit;
}

.container {
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.modal-window {
  & > div {
    border-radius: 1rem;
  }
}

.modal-window div:not(:last-of-type) {
  margin-bottom: 15px;
}

small {
  color: lightgray;
}

.btn {
  background-color: white;
  padding: 1em 1.5em;
  border-radius: 1rem;
  text-decoration: none;
  i {
    padding-right: 0.3em;
  }
}
</style>