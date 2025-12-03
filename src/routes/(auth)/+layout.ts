import type { LayoutLoad } from "./$types";
import { get } from "svelte/store";
import { user } from "$lib/stores/auth";
import { redirect } from "@sveltejs/kit";

export const load: LayoutLoad = () => {
    if (!get(user)) {
        throw redirect(302, "/login");
    }
};


