export interface TableRowType {
  index: number
  category: string
  route: string
}

export const activityRows: TableRowType[] = [
  { index: 1, category: '監督', route: 'directors' },
  { index: 2, category: '脚本', route: 'writers' },
  { index: 3, category: '製作', route: 'producers' },
  { index: 4, category: '撮影', route: 'photographers' },
  { index: 5, category: '製作国', route: 'countries' },
  { index: 6, category: '制作会社', route: 'studios' },
  { index: 7, category: '製作年', route: 'years' },
  { index: 8, category: '上映時間', route: 'times' },
]

export const yearsRow: TableRowType[] = [
  { index: 1, category: '1890年代', route: '1890' },
  { index: 2, category: '1900年代', route: '1900' },
  { index: 3, category: '1910年代', route: '1910' },
  { index: 4, category: '1920年代', route: '1920' },
  { index: 5, category: '1930年代', route: '1930' },
  { index: 6, category: '1940年代', route: '1940' },
  { index: 7, category: '1950年代', route: '1950' },
  { index: 8, category: '1960年代', route: '1960' },
  { index: 9, category: '1970年代', route: '1970' },
  { index: 10, category: '1980年代', route: '1980' },
  { index: 11, category: '1990年代', route: '1990' },
  { index: 12, category: '2000年代', route: '2000' },
  { index: 13, category: '2010年代', route: '2010' },
  { index: 14, category: '2020年代', route: '2020' },
]

export const timesRow: TableRowType[] = [
  { index: 1, category: '~90m', route: 'under90' },
  { index: 2, category: '90m~120m', route: '90and120' },
  { index: 3, category: '120m~', route: 'over120' },
]
