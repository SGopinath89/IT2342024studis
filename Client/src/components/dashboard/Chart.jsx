//using react recharts
//documentation
//https://recharts.org/en-US/guide

import PropTypes from 'prop-types';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

//creates a bar chart using recharts
//called in dashboard
export const Chart = ({data}) => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart width={150} height={40} data={data}>
        <RechartsXAxis dataKey={'name'} />
        <RechartsYAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray='3 3' />
        <Bar dataKey='total' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  );
};

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};