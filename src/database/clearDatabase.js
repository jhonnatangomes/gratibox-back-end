import {
    deletePlans,
    deleteDeliveryDates,
    deleteProducts,
    deleteUsersPlans,
    deleteUsersProducts,
} from './plans.js';

import { deleteCities, deleteStates, deleteAdresses } from './adresses.js';

import { deleteSessions } from './sessions.js';
import { deleteUsers } from './users.js';

import { deleteDeliveries, deleteComplaints } from './deliveries.js';

export default async function clearDatabase() {
    await deleteDeliveries();
    await deleteComplaints();
    await deleteUsersPlans();
    await deleteUsersProducts();
    await deleteSessions();
    await deleteUsers();
    await deleteDeliveryDates();
    await deletePlans();
    await deleteProducts();
    await deleteAdresses();
    await deleteCities();
    await deleteStates();
}
