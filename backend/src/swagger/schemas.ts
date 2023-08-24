import { SchedulesSwaggerSchemas } from '../resources';
import { ExplorationSwaggerSchemas } from '../utils/exploration/exploration';

const schemas = Object.assign(
  { ...SchedulesSwaggerSchemas },
  { ...ExplorationSwaggerSchemas }
);

export default schemas;
