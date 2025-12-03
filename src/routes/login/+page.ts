import type { PageLoad } from "./$types";
import { get } from "svelte/store";
import { user } from "$lib/stores/auth";
import { redirect } from "@sveltejs/kit";

export const load: PageLoad = () => {
    if (get(user)) {
        throw redirect(302, "/");
    }
};
