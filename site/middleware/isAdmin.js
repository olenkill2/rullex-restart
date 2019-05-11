export default function ({ store, redirect, $axios }) {
	if(!store.state.isAdmin) {
		return redirect('/')
	}
}