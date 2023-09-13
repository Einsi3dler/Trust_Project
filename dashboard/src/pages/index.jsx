import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewTransaction } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewSuccesfulEscrows } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalEscrows } from 'src/sections/overview/overview-total-customers';

const customStyle = {
  marginLeft: 'auto',
  marginRight: 'auto',
}


const Page = () => (
  <>
    <Head>
      <title>
        Overview
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <h1 style={{marginBottom: '7%', textAlign: 'center'}}>
        Welcome Back, User
      </h1>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
            style={customStyle}
          >
            <OverviewTransaction
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="₦190K"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
            style={customStyle}
          >
            <OverviewTotalEscrows
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="15"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
            style={customStyle}
          >
            <OverviewSuccesfulEscrows
              sx={{ height: '100%' }}
              value={90}
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
            style={{width: '100%'}}
          >
            <OverviewLatestOrders
              orders={[
                {
                  id: 'f69f88012978187a6c12897s',
                  ref: 'DEV1050',
                  amount: 100,
                  customer: {
                    name: 'Sylvester Divine'
                  },
                  createdAt:1555016400001,
                  status: 'pending'
                },
                {
                  id: 'f69f88012978187a6c12897f',
                  ref: 'DEV1049',
                  amount: 30.5,
                  customer: {
                    name: 'Ekaterina Tankova'
                  },
                  createdAt: 1555016400000,
                  status: 'completed'
                },
                {
                  id: '9eaa1c7dd4433f413c308ce2',
                  ref: 'DEV1048',
                  amount: 25.1,
                  customer: {
                    name: 'Cao Yu'
                  },
                  createdAt: 1555016400000,
                  status: 'completed'
                },
                {
                  id: '01a5230c811bd04996ce7c13',
                  ref: 'DEV1047',
                  amount: 10.99,
                  customer: {
                    name: 'Alexa Richardson'
                  },
                  createdAt: 1554930000000,
                  status: 'refunded'
                },
                {
                  id: '1f4e1bd0a87cea23cdb83d18',
                  ref: 'DEV1046',
                  amount: 96.43,
                  customer: {
                    name: 'Anje Keizer'
                  },
                  createdAt: 1554757200000,
                  status: 'failed'
                },
                {
                  id: '9f974f239d29ede969367103',
                  ref: 'DEV1045',
                  amount: 32.54,
                  customer: {
                    name: 'Clarke Gillebert'
                  },
                  createdAt: 1554670800000,
                  status: 'completed'
                },
                {
                  id: 'ffc83c1560ec2f66a1c05596',
                  ref: 'DEV1044',
                  amount: 16.76,
                  customer: {
                    name: 'Adam Denisov'
                  },
                  createdAt: 1554670800000,
                  status: 'completed'
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
