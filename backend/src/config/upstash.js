import {Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"
import dotenv from 'dotenv'

dotenv.config()
//creates a reate limiter that allows a certain number (100) request per a certain number of seconds (60)
const ratelimit = new Ratelimit({
    redis : Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(100,"60 s")
})
export default ratelimit