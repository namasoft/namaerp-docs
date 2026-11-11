<template>
  <!-- dir="ltr": a flowchart reads left to right even on the Arabic (RTL) pages. An attribute rather
       than CSS, so postcss-rtlcss cannot mirror it. -->
  <div class="mermaid-diagram" dir="ltr" role="img" :aria-label="label">
    <div v-if="svg" class="mermaid-diagram-svg" v-html="svg"/>
    <pre v-else-if="failed" class="mermaid-diagram-error">{{ source }}</pre>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import {useData} from 'vitepress'

// The ```mermaid fence is turned into <MermaidDiagram code="…"/> in config.mts; the source arrives
// URI-encoded so quotes, braces and Arabic text survive the Vue template compiler untouched.
const props = defineProps<{ code: string }>()
const {isDark} = useData()
const source = computed(() => decodeURIComponent(props.code))
const label = computed(() => source.value.split('\n')[0])
const svg = ref('')
const failed = ref(false)
let renderCount = 0

async function render() {
    const current = ++renderCount
    // Loaded on demand, so pages without a diagram never download mermaid
    const {default: mermaid} = await import('mermaid')
    mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: isDark.value ? 'dark' : 'default',
        fontFamily: 'var(--vp-font-family-base)',
        flowchart: {htmlLabels: true, useMaxWidth: true}
    })
    try {
        const {svg: out} = await mermaid.render(`mermaid-${Math.random().toString(36).slice(2)}`, source.value)
        if (current === renderCount) {
            svg.value = out
            failed.value = false
        }
    } catch (e) {
        console.error('[MermaidDiagram]', e)
        if (current === renderCount) {
            svg.value = ''
            failed.value = true
        }
    }
}

onMounted(render)
watch(isDark, render)
</script>

<style scoped>
.mermaid-diagram {
  margin: 16px 0;
  overflow-x: auto;
  text-align: center;
}

.mermaid-diagram-svg :deep(svg) {
  max-width: 100%;
  height: auto;
}

/* Each label takes its direction from its own first letter, so an Arabic label reads right to left
   (punctuation and an English term in brackets land where an Arabic reader expects them) while the
   diagram itself stays left to right. */
.mermaid-diagram-svg :deep(.nodeLabel),
.mermaid-diagram-svg :deep(.edgeLabel),
.mermaid-diagram-svg :deep(.label) {
  unicode-bidi: plaintext;
}

.mermaid-diagram-error {
  text-align: left;
  color: var(--vp-c-danger-1);
}
</style>
