/**
 * Vercel Speed Insights Integration
 * This script initializes Speed Insights for the Mishra Classes website
 */

import { injectSpeedInsights } from './vendor/speed-insights.mjs';

// Initialize Speed Insights
injectSpeedInsights({
    debug: false
});
