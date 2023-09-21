import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { Grid, Container, Typography } from '@mui/material';
// components
// sections
import {
  AppNewsUpdate,
  AppOrderTimeline,
  AppWidgetSummary
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {

  return (
    <>
      <Helmet>
        <title> Trust Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Transactions Amount" total={714000} icon={'ant-design:dollar-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Transactions Completed" total={175} color="warning" icon={'ant-design:dollar-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Scammers Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>




          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Transactions Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="New Transactions Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'John Depps pays $4220 for Cargo transaction',
                  'Richard Vailes reduced agreed prices',
                  'Website tranasction completed',
                  'New transaction placed by Cao yu',
                  'New transaction placed Leo Messi',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
