import { component$ } from "@builder.io/qwik";

export default component$(() => {
    return (
        <>
            <div>

                <div class="bg-white text-gray-800 dark:bg-gray-800 dark:text-white">
                    Dark mode content
                    <h1 class="font-museomoderno text-display-large">Dashboard</h1>
                </div>
            </div>
        </>
    );
});