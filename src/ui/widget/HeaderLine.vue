<template>
    <div class="qv-header-line">

    </div>
</template>

<script lang="ts">
import { Vue, Emit, Component, Prop, Watch } from "vue-property-decorator";
import InlineMessage, { MessageType, Message } from './InlineMessage.vue'

@Component({
    name: 'qv-header-line',
    components: {
        'qv-inline-message': InlineMessage
    }
})
export default class Header extends Vue {

    @Prop({ default: null }) message: Message

}

export { Message, MessageType }
</script>
