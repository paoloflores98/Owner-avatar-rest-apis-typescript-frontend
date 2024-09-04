import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

// ActionFunctionArgs: Type para los actions
export async function action({request}: ActionFunctionArgs) {
	
	// Object.fromEntries: Forma de obtener los datos de un FormData
	const data = Object.fromEntries(await request.formData());
	
	let error = '';
	if(Object.values(data).includes('')) {
		error = 'Todos los campos son obligatorios';
	}

	if(error.length) {
		return error;
	}

	await addProduct(data);

	return redirect('/');
}

const NewProduct = () => {
	// useActionData: Forma de obtener el valor retornado del action
	const error = useActionData() as string;

  return (
		<>
			<div className="flex justify-between">
			<h2 className="text-4xl font-black text-slate-500">Registrar producto</h2>
			<Link
				className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
				to="/"
			>
				Volver a Productos
			</Link>
			</div>

			{error && <ErrorMessage>{error}</ErrorMessage>}
			<Form
				className="mt-10"
				method="POST"
			>
				<ProductForm /> {/* Renderiza el componente */}

				<input
				type="submit"
				className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
				value="Registrar producto"
				/>
			</Form>
		</>
  )
}

export default NewProduct;
