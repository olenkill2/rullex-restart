export default function ({ store, redirect }) {
	if (!store.state.user.authorized) {
		return redirect('/')
	}
}