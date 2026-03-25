<script lang="ts">
  import { authClient } from "$lib/auth-client";
  import { goto } from "$app/navigation";
  let email = $state("");
  let password = $state("");
  let name = $state("");
  let role = $state<"dev" | "client">("client");
  let error = $state("");

  async function submit() {
    error = "";
    try {
      await (authClient.signUp.email as any)({
        email,
        password,
        name,
        role,
      });
      goto(role === "dev" ? "/dashboard" : "/");
    } catch (e: any) {
      error = e?.message ?? "Erreur lors de l'inscription";
    }
  }
</script>

{#if role === "client"}
  <h1>Inscription client</h1>
  <input bind:value={name} placeholder="Nom complet" />
  <input bind:value={email} type="email" placeholder="Email" />
  <input bind:value={password} type="password" placeholder="Mot de passe" />
  <button onclick={submit}>S'inscrire</button>
  {#if error}<p>{error}</p>{/if}
  <p>Vous êtes développeur ? <button onclick={() => role = "dev"}>Créer un compte dev</button></p>
  <a href="/login">Déjà un compte ? Se connecter</a>
{:else}
  <h1>Inscription développeur</h1>
  <input bind:value={name} placeholder="Nom complet" />
  <input bind:value={email} type="email" placeholder="Email" />
  <input bind:value={password} type="password" placeholder="Mot de passe" />
  <button onclick={submit}>S'inscrire en tant que dev</button>
  {#if error}<p>{error}</p>{/if}
  <p><button onclick={() => role = "client"}>← Retour inscription client</button></p>
  <a href="/login">Déjà un compte ? Se connecter</a>
{/if}