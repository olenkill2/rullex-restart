export default function ({ store, redirect }) {
	if(store.state.user.user.role !== 'admin') {
		return redirect('/error')
	}
}
