<script setup>
import { computed, ref } from 'vue'

const ACCEPTED = ['.pdf', '.doc', '.docx']
const MAX_SIZE_MB = 10

const inputRef = ref(null)
const isDragging = ref(false)
const filename = ref('')
const error = ref('')

const hasFile = computed(() => filename.value !== '')

function validate(file) {
  if (!file) return 'No file selected.'
  const lower = file.name.toLowerCase()
  const allowed = ACCEPTED.some((ext) => lower.endsWith(ext))
  if (!allowed) return `Only ${ACCEPTED.join(' / ')} files are allowed.`
  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return `File is larger than ${MAX_SIZE_MB} MB.`
  }
  return ''
}

function handleFile(file) {
  const message = validate(file)
  if (message) {
    error.value = message
    filename.value = ''
    return
  }
  error.value = ''
  filename.value = file.name
}

function openPicker() {
  inputRef.value?.click()
}

function onInputChange(event) {
  handleFile(event.target.files?.[0])
}

function onDragOver() {
  isDragging.value = true
}

function onDragLeave() {
  isDragging.value = false
}

function onDrop(event) {
  isDragging.value = false
  handleFile(event.dataTransfer?.files?.[0])
}

function clearFile() {
  filename.value = ''
  error.value = ''
  if (inputRef.value) inputRef.value.value = ''
}
</script>

<template>
  <section class="card" aria-labelledby="upload-title">
    <h2 id="upload-title" class="card__title">Upload file</h2>

    <!-- Drop zone: label wires the hidden input, so keyboard works too -->
    <label
      class="dropzone"
      :class="{ 'dropzone--dragging': isDragging, 'dropzone--filled': hasFile }"
      for="resume-file"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <input
        id="resume-file"
        ref="inputRef"
        class="dropzone__input"
        type="file"
        :accept="ACCEPTED.join(',')"
        @change="onInputChange"
      />

      <svg class="dropzone__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M7 18a4 4 0 0 1-.6-7.96 5.5 5.5 0 0 1 10.6-1.05A3.75 3.75 0 0 1 17.5 18H7Z"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linejoin="round"
        />
        <path
          d="M12 15.5V9.8m0 0L9.8 12M12 9.8l2.2 2.2"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <p v-if="!hasFile" class="dropzone__text">
        Drag your resume file here or click on the area to select
        <span class="dropzone__hint">The appropriate file is allowed.</span>
      </p>

      <p v-else class="dropzone__file">
        <span class="dropzone__filename">{{ filename }}</span>
        <button type="button" class="dropzone__clear" @click.prevent.stop="clearFile">
          remove
        </button>
      </p>
    </label>

    <p v-if="error" class="card__error" role="alert">{{ error }}</p>

    <div class="card__actions">
      <button type="button" class="btn btn--ghost">Last step</button>
      <button type="button" class="btn btn--primary" :disabled="!hasFile">
        Finish
      </button>
    </div>

    <div class="steps" aria-label="Step 3 of 3">
      <span class="steps__dot"></span>
      <span class="steps__dot"></span>
      <span class="steps__dot steps__dot--active"></span>
    </div>
  </section>
</template>

<style scoped>
.card {
  width: 100%;
  max-width: 440px;
  padding: var(--space-5);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.card__title {
  margin: 0 0 var(--space-4);
  font-size: 18px;
  font-weight: 600;
}

/* ---------- Drop zone ---------- */
.dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 190px;
  padding: var(--space-4);
  text-align: center;
  cursor: pointer;
  background: var(--color-drop-bg);
  border: 1.5px dashed var(--color-drop-border);
  border-radius: var(--radius-md);
  transition:
    border-color 0.15s ease,
    background 0.15s ease,
    transform 0.15s ease;
}

.dropzone:hover,
.dropzone:focus-within {
  border-color: var(--color-drop-border-active);
}

.dropzone--dragging {
  border-color: var(--color-drop-border-active);
  background: var(--color-primary-soft);
  transform: scale(1.01);
}

.dropzone--filled {
  border-style: solid;
  border-color: var(--color-primary);
}

.dropzone__input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.dropzone__icon {
  width: 44px;
  height: 44px;
  color: var(--color-primary);
}

.dropzone__text {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
  color: var(--color-text-muted);
  max-width: 260px;
}

.dropzone__hint {
  display: block;
  margin-top: var(--space-1);
  font-size: 11px;
  color: #b3bacb;
}

.dropzone__file {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
}

.dropzone__filename {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropzone__clear {
  align-self: center;
  padding: 0;
  font-size: 12px;
  color: var(--color-primary);
  background: none;
  border: 0;
  cursor: pointer;
  text-decoration: underline;
}

/* ---------- Validation message ---------- */
.card__error {
  margin: var(--space-3) 0 0;
  font-size: 12px;
  color: #e8452c;
}

/* ---------- Buttons ---------- */
.card__actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-5);
}

.btn {
  flex: 1;
  padding: 12px 20px;
  font-size: 13px;
  font-weight: 600;
  border: 0;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition:
    background 0.15s ease,
    transform 0.1s ease,
    box-shadow 0.15s ease;
}

.btn--ghost {
  color: #ffffff;
  background: var(--color-primary-soft);
}

.btn--ghost:hover {
  background: #c7ddff;
}

.btn--primary {
  color: #ffffff;
  background: var(--color-primary);
  box-shadow: var(--shadow-button);
}

.btn--primary:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.btn--primary:disabled {
  cursor: not-allowed;
  background: #c7d7fb;
  box-shadow: none;
}

.btn:active:not(:disabled) {
  transform: translateY(1px);
}

/* ---------- Step dots ---------- */
.steps {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: var(--space-5);
}

.steps__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-dot-idle);
}

.steps__dot--active {
  background: var(--color-primary);
}

@media (max-width: 900px) {
  .card {
    max-width: none;
  }
}
</style>
