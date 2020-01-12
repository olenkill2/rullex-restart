import { extend } from "vee-validate";
import { required, alpha } from "vee-validate/dist/rules";

extend("required", {
	...required,
	message: "Обязательное поле"
});

extend("alpha", {
	...alpha,
	message: "Поле должно содержать только буквы"
});
