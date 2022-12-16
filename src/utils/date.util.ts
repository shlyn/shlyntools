/**
 * Get time countdown
 * @param timestamp
 * @param format
 */
export const getDateCount = (timestamp: number, format = '{d} days {hh} hours {mm} minutes') => {
  if (!timestamp) {
    return ''
  }
  const now = Date.now()
  const until = new Date(timestamp).getTime()
  let diff = until - now
  if (diff < 0) {
    diff = 0
  }
  const days = diff / 1000 / 3600 / 24
  const day = Math.floor(days)
  const showDay = day.toString() || ''
  const hours = (days - day) * 24
  const hour = Math.floor(hours)
  const showHour = fillZero(hour)
  const minutes = (hours - hour) * 60
  const minute = Math.floor(minutes)
  const showMinute = fillZero(minute)
  const seconds = (minutes - minute) * 60
  const second = Math.floor(seconds)
  const showSecond = fillZero(second)
  return format.replace('{d}', showDay)
    .replace('{h}', hour.toString())
    .replace('{hh}', showHour)
    .replace('{m}', hour.toString())
    .replace('{mm}', showMinute)
    .replace('{s}', hour.toString())
    .replace('{ss}', showSecond)
}

/**
 * Get the datetime stamp of a day before or after
 * @param {number} days
 * @param {number} hours
 * @param {number} minutes
 * @returns number
 */
export const getPrevOrNextDaysDate = (days: number, hours: number, minutes: number = 0) => {
  const setDate = new Date().setHours(hours, minutes, 0, 0)
  const oneDay = 24 * 60 * 60 * 1000
  return setDate + oneDay * days
}

/**
 * Date time format handling
 * @param val datetime value
 * @param formatString datetime format
 * @returns {string}
 */
export const dateFormatter = (val: any, formatString: string = 'yyyy-MM-dd hh:mm:ss') => {
  const value = typeof val === 'string' ? val.replace(/-/g, '/') : val
  const date = new Date(value)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const second = date.getSeconds()
  return formatString.replace('yyyy', year.toString())
    .replace('MM', fillZero(month))
    .replace('M', month.toString())
    .replace('dd', fillZero(day))
    .replace('d', day.toString())
    .replace('hh', fillZero(hours))
    .replace('h', hours.toString())
    .replace('mm', fillZero(minutes))
    .replace('m', minutes.toString())
    .replace('ss', fillZero(second))
    .replace('s', second.toString())
}

/**
 * Less than 10 complement 0 format processing
 * @param {number} val
 * @returns {string}
 */
export const fillZero = (val: number): string => {
  return +val < 10 ? `0${ val }` : val.toString()
}


/**
 * format the current time
 * @param {number} seconds
 * @returns string
 */
export const getTimeString = (seconds: number): string => {
  const s = Math.ceil(seconds)
  const min = Math.floor(s / 60)
  const ns = parseInt((s % 60).toString())
  const ss = ns < 10 ? '0' + ns : ns.toString()
  return min + ':' + ss
}

/**
 * Get a future timestamp
 * @param days
 * @returns number
 */
export const getFutureDateTimestamp = (days: number): number => {
  const now = new Date()
  return getPrevOrNextDaysDate(days, now.getHours(), now.getMinutes())
}

/**
 * Get the time string from now
 * @param timestamp
 * @returns string
 */
export const getDateStrFromNow = (timestamp: number): string => {
  const dateDiff = (new Date().getTime() - timestamp) / 1000
  const minute = 60
  const hour = minute * 60
  const day = hour * 24
  const month = day * 30
  const monthC = dateDiff / month
  const dayC = dateDiff / day
  const hourC = dateDiff / hour
  const minC = dateDiff / minute
  if (monthC >= 1) {
    return parseInt(monthC.toString()) + ' months ago'
  } else if (dayC >= 1) {
    return parseInt(dayC.toString()) + ' days ago'
  } else if (hourC >= 1) {
    return parseInt(hourC.toString()) + ' hours ago'
  } else if (minC >= 1) {
    return parseInt(minC.toString()) + ' minutes ago'
  } else {
    return 'Just recently'
  }
}
