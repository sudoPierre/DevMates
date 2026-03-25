<script lang="ts">
  import { authClient } from "$lib/auth-client";
  import { goto } from "$app/navigation";

  let email = $state("");
  let password = $state("");
  let error = $state("");

  async function submit() {
    error = "";
    try {
      const res = await (authClient.signIn.email as any)({
        email,
        password,
      });
      const role = res?.user?.role;
      goto(role === "dev" ? "/dashboard" : "/");
    } catch (e: any) {
      error = e?.message ?? "Erreur lors de la connexion";
    }
  }
</script>

<h1>Connexion</h1>

<input bind:value={email} type="email" placeholder="Email" />
<input bind:value={password} type="password" placeholder="Mot de passe" />

<button onclick={submit}>Se connecter</button>

{#if error}<p>{error}</p>{/if}

<a href="/register">Pas de compte ? S'inscrire</a>