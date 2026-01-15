import { computed } from 'vue';
import { user, token } from './state';

export const isAuthenticated = computed(() => !!token.value && !!user.value);
