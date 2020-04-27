import PageHeader from '~/components/dashboard/PageHeader'
import DashboardTable from '~/components/dashboard/DashboardTable'
import FormControls from '~/components/dashboard/FormControls'

export default {
  components: {
    PageHeader,
    DashboardTable,
    FormControls
  },
  middleware: ['isAdmin']
}
