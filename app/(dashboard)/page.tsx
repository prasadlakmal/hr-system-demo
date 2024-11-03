'use client';
import { Box, Container, Grid2, Typography } from '@mui/material';
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { city: 'New York', age: 30 },
  { city: 'Los Angeles', age: 25 },
  { city: 'Chicago', age: 35 },
  { city: 'Houston', age: 20 },
  { city: 'Phoenix', age: 40 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function HomePage() {
  return (
    <Container>
      <Grid2 container spacing={5}>
        <Box boxShadow={3} padding={2}>
          <Typography variant='h6'>Age Distribution by Cities</Typography>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={data}>
              <XAxis dataKey='city' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='age' fill='#8884d8' />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box boxShadow={3} padding={2}>
          <Typography variant='h6'>Age Distribution by Cities</Typography>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey='age'
                nameKey='city'
                cx='50%'
                cy='50%'
                outerRadius={100}
                fill='#8884d8'
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Grid2>
    </Container>
  );
}
