<script lang="ts">
  import Upload from "@lucide/svelte/icons/upload";
  import type { PageData } from "./$types";
  let { data }: { data: PageData } = $props();
  let firstName = $state(data.profile?.firstName ?? "");
  let lastName = $state(data.profile?.lastName ?? "");
  let title = $state(data.profile?.title ?? "");
  let github = $state(data.profile?.github ?? "");
  let cvFile = $state<File | null>(null);
  let image = $state<File | null>(null);
  let imagePreview = $state<string | null>(
    data.profile?.imageUrl ? `${data.profile.imageUrl}?t=${Date.now()}` : null
  );
  let cvName = $state<string | null>(
    data.profile?.cvUrl ? data.profile.cvUrl.split("/").pop() ?? "CV existant" : null
  );
  let loading = $state(false);
  let success = $state(false);
  let error = $state("");

  function onImageChange(e: Event) {
    const file = (e.currentTarget as HTMLInputElement).files?.[0] ?? null;
    image = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => (imagePreview = ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  function onCvChange(e: Event) {
    const file = (e.currentTarget as HTMLInputElement).files?.[0] ?? null;
    cvFile = file;
    if (file) cvName = file.name;
  }

  async function submit() {
    loading = true;
    error = "";
    success = false;

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("title", title);
    formData.append("github", github);
    if (cvFile) formData.append("cv", cvFile);
    if (image) formData.append("image", image);

    const res = await fetch("/api/profile", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      success = true;
    } else {
      const json = await res.json();
      error = json.error ?? "Erreur lors de la sauvegarde";
    }
    loading = false;
  }
</script>

<div class="dashboard-title">
  <h1>Bienvenue sur ton dashboard, {data.user.name} 👋</h1>
</div>

<div class="plans">
  vous pouvez passer à l'option premium à tout moment
</div>

<div class="dashboard-layout">

  <!-- FORMULAIRE -->
  <div class="card">
    <div class="info-title">
      <h3>Profile Information</h3>
      <p>Mettez à jour vos informations</p>
    </div>

    <div class="image-upload-wrapper">
      <div class="image-frame">
        {#if imagePreview}
          <img src={imagePreview} alt="Preview" class="profile-img" />
        {:else}
          <div class="image-placeholder">Aucune photo</div>
        {/if}
        <input id="image" type="file" accept="image/*" onchange={onImageChange} style="display:none" />
        <button class="image-upload-btn" onclick={() => document.getElementById('image')?.click()}>
          <Upload size={14} />
        </button>
      </div>
    </div>

    <div class="info">
      <div>
        <label for="firstName">Prénom</label>
        <input id="firstName" bind:value={firstName} placeholder="Prénom" />
      </div>
      <div>
        <label for="lastName">Nom</label>
        <input id="lastName" bind:value={lastName} placeholder="Nom" />
      </div>
    </div>

    <div class="links">
      <div>
        <label for="title">Titre</label>
        <input id="title" bind:value={title} placeholder="Titre (ex: Fullstack React)" />
      </div>
      <div class="git-spacing">
        <label for="github">GitHub</label>
        <input id="github" bind:value={github} placeholder="" />
      </div>
    </div>

    <div style="margin-top: 24px;">
      <input id="cv" type="file" accept="application/pdf" onchange={onCvChange} style="display:none" />
      <button
        onclick={() => document.getElementById('cv')?.click()}
        style="border: 1px solid #dfe3e7; border-radius: 12px; padding: 6px 16px; background: transparent; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;"
      >
        <Upload />
        Importer votre CV
      </button>
      <p style="height:22px; width:666px; padding: 8px 40px 8px 12px; border: 1px solid #dfe3e7; border-radius: 10px; background-color: #f9fafb; margin-top: 8px;">
        {#if cvName}{cvName}{/if}
      </p>
    </div>

    <div style="margin-top: 24px;">
      <button class="save-btn" onclick={submit} disabled={loading}>
        {loading ? "Enregistrement..." : "Sauvegarder"}
      </button>
    </div>

    {#if success}<p style="margin-top:12px; color:green;">Profil enregistré avec succès !</p>{/if}
    {#if error}<p style="margin-top:12px; color:red;">{error}</p>{/if}
  </div>

  <div class="preview-wrapper">
    <p class="preview-label">Aperçu de votre carte</p>
    <div class="preview-card">
      <div class="preview-img-wrapper">
        {#if imagePreview}
          <img src={imagePreview} alt="preview" class="preview-img" />
        {:else}
          <div class="preview-img-placeholder"></div>
        {/if}
      </div>
      <div class="preview-info">
        <h3 class="preview-name">
          {firstName || "Prénom"} {lastName || "Nom"}
        </h3>
        <p class="preview-title">{title || "Titre du poste"}</p>
        {#if github}
          <a href={github} target="_blank" class="preview-github">GitHub →</a>
        {/if}
        {#if cvName}
          <p class="preview-cv">📄{cvName}</p>
        {/if}
      </div>
    </div>
  </div>

</div>

<style>
:root {
  --font-family: 'BDO Grotesk';
}

:global(body) {
  background-color: #f3f0eb;
}

.dashboard-title {
  width: 100%;
  max-width: 1440px;
  position: relative;
  justify-content: center;
  margin: auto;
  text-align: center;
}

.dashboard-layout {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  justify-content: center;
  margin: 32px auto;
  max-width: 1440px;
  padding: 0 24px;
}

.card {
  display: grid;
  justify-content: center;
  align-items: center;
  width: 768px;
  background-color: #ffff;
  border-radius: 12px;
  padding: 24px;
}

.info {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .info {
    grid-template-columns: repeat(2, 1fr);
  }
}

.info-title {
  padding: 24px 0px;
}

.info-title p {
    color: #888;
}

label {
  display: block;
    font-family: var(--font-family);

}

input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 1px;
  outline: 1px;
  font: inherit;

}

.plans {
  outline: 1px;
}

#firstName, #lastName {
  height: 22px;
  width: 322px;
  padding: 8px 12px 8px 12px;
  border: 1px solid #dfe3e7;
  border-radius: 10px;
  background-color: #f9fafb;
  margin-top: 8px;
  font-family: var(--font-family);

}

#title, #github {
  height: 22px;
  width: 666px;
  padding: 8px 40px 8px 12px;
  border: 1px solid #dfe3e7;
  border-radius: 10px;
  background-color: #f9fafb; 
  margin-top: 8px;
  font-family: var(--font-family);

}

@font-face {
  font-display: swap;
  font-family: 'BDO Grotesk';
  font-style: normal;
  font-weight: 300;
  src: url(/src/lib/fonts/BDOGrotesk-Medium.woff2) format('woff2');
}

:global(h1, h2, h3, p) {
  margin: 0px;
  font-family: var(--font-family);
}

#logos {
  width: 20px;
}

.links {
  margin-top: 24px;
}

.git-spacing {
  margin-top: 24px;
}

/* Image upload */
.image-upload-wrapper {
  margin-bottom: 24px;
}

.image-frame {
  position: relative;
  width: 120px;
  height: 120px;
}

.profile-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  display: block;
}

.image-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  background-color: #f9fafb;
  border: 1px solid #dfe3e7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: #aaa;
}

.image-upload-btn {
  position: absolute;
  bottom: 6px;
  left: 6px;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: white;
  border: 1px solid #dfe3e7;
  outline: 2px solid white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.save-btn {
  border: 1px solid #dfe3e7;
  border-radius: 12px;
  padding: 8px 24px;
  background: #111;
  color: white;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: 14px;
}

.save-btn:hover {
  background: #333;
}

/* Preview carte */
.preview-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: sticky;
  top: 32px;
}

.preview-label {
  font-size: 12px;
  color: #888;
  text-align: center;
}

.preview-card {
  width: 280px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
}

.preview-img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
}

.preview-img-placeholder {
  width: 100%;
  height: 280px;
  background-color: #f3f0eb;
}

.preview-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.preview-name {
  font-size: 16px;
  font-weight: 500;
  color: #111;
}

.preview-title {
  font-size: 13px;
  color: #666;
}

.preview-github {
  font-size: 12px;
  color: #111;
  text-decoration: none;
}

.preview-github:hover {
  text-decoration: underline;
}

.preview-cv {
  font-size: 12px;
  color: #888;
}
</style>