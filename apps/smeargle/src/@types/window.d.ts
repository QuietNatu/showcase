import { AppConfig } from '@/app/core/contexts/config/config-context';

declare global {
  interface Window {
    __natu_config__: AppConfig;
  }
}
