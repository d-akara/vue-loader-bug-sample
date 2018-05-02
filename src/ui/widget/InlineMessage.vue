<template>
    <div>
    </div>
</template>

<script lang="ts">
import { Vue, Emit, Component, Prop, Watch } from "vue-property-decorator";

export type MessageType = 'none' | 'info' | 'warning' | 'error' | 'success' | 'loading'
export interface Message {
     type: MessageType
     dismissable: boolean
     content: string
}

@Component({
    name: 'qv-inline-message'
})
export default class InlineMessage extends Vue {

}
</script>