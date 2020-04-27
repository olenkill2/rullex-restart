<template>
  <table class="dashboard-table">
    <tbody>
      <slot name="head">
        <tr v-if="headers.length">
          <th
            v-for="(item, key) in headers"
            :key="key"
          >
            {{ item }}
          </th>
        </tr>
      </slot>
      <slot name="body">

      </slot>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "DashboardTable",
    props: {
      headers: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style lang="scss">
  .dashboard-table
	{
		width: 100%;
		display: block;
		overflow-x: auto;
		white-space: nowrap;
		padding-bottom: 20px;
		min-width: 100%;
		tbody
		{
			width: 100%;
			display: table;
		}
		th
		{
			padding-bottom: 14px;
			font-size: 16px;
			width: auto;
		}
		td,th
		{
			padding-right: 25px;
			white-space: nowrap;
			font-size: 15px;
			padding-top: 8px;
			padding-bottom: 8px;
			&:last-child
			{
				padding-right: 0;
			}
		}
	}
</style>
