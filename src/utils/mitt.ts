import mitt from 'mitt'
import type { Events } from '@/types/events'

export const emitter = mitt<Events>()
