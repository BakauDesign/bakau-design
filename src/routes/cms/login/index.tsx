import { $, component$, QRL } from "@builder.io/qwik";
// import {
// 	// Input,
// 	Button
// } from "flowbite-qwik";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import {
	// routeAction$,
	routeLoader$,
} from '@builder.io/qwik-city';

import { formAction$, type InitialValues, SubmitHandler, useForm, valiForm$ } from '@modular-forms/qwik'

import * as v from 'valibot';

import { createToken } from "~/lib/auth";

import submarkLogo from "~/assets/Submark Logo.png";
import teamCard from "~/assets/Team card.png";
import { LoaderCircle } from "~/assets/icons/loader-circle";

const LoginSchema = v.object({
	email: v.pipe(
		v.string(),
		v.nonEmpty('Please enter your email.'),
		v.email('The email address is badly formatted.'),
	),
	password: v.pipe(
		v.string(),
		v.nonEmpty('Please enter your password.'),
		v.minLength(8, 'Your password must have 8 characters or more.'),
	),
});
   
type LoginForm = v.InferInput<typeof LoginSchema>;

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
	email: '',
	password: '',
}));

export const useFormAction = formAction$<LoginForm>( async(values, event) => {
	const { email, password } = values;
	const { request, cookie, platform, redirect } = await event;

	if (email === "achmadjulian@bakaudesign.com" && password === "Zahra4444") {
		await createToken({ request, cookie, platform });

		redirect(302, "/cms/dashboard")
	}
}, valiForm$(LoginSchema));

export default component$(() => {
	const [loginForm, { Form, Field }] = useForm<LoginForm>({
		loader: useFormLoader(),
		action: useFormAction(),
		validate: valiForm$(LoginSchema),
	});
	
	const handleSubmit: QRL<SubmitHandler<LoginForm>> = $((values) => {
		console.info('client side', { ...values })
	})

	return (
		<>
			<div class={`
				h-full w-full flex gap-x-12
				dark:bg-neutral-950	
			`}>
				<section class="p-6 h-full w-full max-w-[600px] flex flex-col gap-12">
					<figure class="flex items-center gap-x-3">
						<img
							height={24}
							width={24}
							class="h-6 aspect-square"
							src={submarkLogo}
							alt="Bakau Design"
						/>

						<figcaption>Bakau Design CMS</figcaption>
					</figure>

					<section class="flex flex-col gap-6">
						<article class="flex flex-col gap-y-6">
							<h1 class="text-4xl font-semibold text-neutral-50">
								Hai, kita ketemu lagi!
							</h1>

							<p class="text-sm sm:text-base text-neutral-200">
								Masuk dulu yuk biar bisa mulai kerjain konten. <br /> Gak perlu ribet—cukup email dan password, langsung gas!
							</p>
						</article>

						<Form onSubmit$={handleSubmit} class="flex flex-col gap-y-6">

							<Field name="email">
								{(field, props) => (
								<div class="flex flex-col gap-y-3">
									<label for={field.name} class="text-sm sm:text-base text-neutral-50">
										Email
									</label>

									<Input
										{...props}
										type="email"
										id={field.name}
										name={field.name}
										value={field.value}
										placeholder="hi@bakaudesign.com"
									/>
									{field.error && <p class="text-red-500">{field.error}</p>}
								</div>
								)}
							</Field>

							<Field name="password">
								{(field, props) => (
								<div class="flex flex-col gap-y-3">
									<label for={field.name} class="text-sm sm:text-base text-neutral-50">
										Password
									</label>
									
									<Input
										{...props}
										type="password"
										id={field.name}
										name={field.name}
										value={field.value}
										placeholder="x8jnd121r"
									/>
									{field.error && <p class="text-red-500">{field.error}</p>}
								</div>
								)}
							</Field>

							<Button
								variant="default"
								type="submit"
								size="lg"
							>
								<div>
									{loginForm.submitting ? (
										<LoaderCircle />
									) : (
										<p>Login</p>
									)}
								</div>
							</Button>
						</Form>
					</section>
				</section>

				<img
					height={1000}
					width={1000}
					src={teamCard} 
					alt="Team Card"
					class="h-full w-full object-cover"
				/>
				
			</div>
		</>
	);
});