import { CRONJOB_API } from '@/constants/api';
import { apiServices } from '@/services/api';

const CronJobServices = {
  cronJobTrigger(params: {
    jobName: string;
    executeAt: string;
    immediate: boolean;
    sourceType: string;
    avatarId: string;
    voiceId: string;
  }) {
    return apiServices.post(CRONJOB_API.CRONJOB_TRIGGER, params);
  },
};

export default CronJobServices;
