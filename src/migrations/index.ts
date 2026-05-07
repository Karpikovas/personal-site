import * as migration_20260428_135123 from './20260428_135123';
import * as migration_20260507_120000_add_seo_and_visibility from './20260507_120000_add_seo_and_visibility';

export const migrations = [
  {
    up: migration_20260428_135123.up,
    down: migration_20260428_135123.down,
    name: '20260428_135123'
  },
  {
    up: migration_20260507_120000_add_seo_and_visibility.up,
    down: migration_20260507_120000_add_seo_and_visibility.down,
    name: '20260507_120000_add_seo_and_visibility'
  },
];
