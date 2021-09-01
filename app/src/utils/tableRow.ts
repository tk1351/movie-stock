export interface TableRowType {
  index: number
  category: string
  route: string
}

export const activityRows: TableRowType[] = [
  { index: 1, category: '監督', route: '/user/directors' },
  { index: 2, category: '脚本', route: '/user/writers' },
  { index: 3, category: '製作', route: '/user/producers' },
  { index: 4, category: '撮影', route: '/user/photographers' },
  { index: 5, category: '製作国', route: '/user/countries' },
  { index: 6, category: '制作会社', route: '/user/studios' },
  { index: 7, category: '製作年', route: '/user/years' },
  { index: 8, category: '上映時間', route: '/user/times' },
]

export const yearsRow: TableRowType[] = [
  { index: 1, category: '1890年代', route: '/user/list/years/1890s' },
  { index: 2, category: '1900年代', route: '/user/list/years/1900s' },
  { index: 3, category: '1910年代', route: '/user/list/years/1910s' },
  { index: 4, category: '1920年代', route: '/user/list/years/1920s' },
  { index: 5, category: '1930年代', route: '/user/list/years/1930s' },
  { index: 6, category: '1940年代', route: '/user/list/years/1940s' },
  { index: 7, category: '1950年代', route: '/user/list/years/1950s' },
  { index: 8, category: '1960年代', route: '/user/list/years/1960s' },
  { index: 9, category: '1970年代', route: '/user/list/years/1970s' },
  { index: 10, category: '1980年代', route: '/user/list/years/1980s' },
  { index: 11, category: '1990年代', route: '/user/list/years/1990s' },
  { index: 12, category: '2000年代', route: '/user/list/years/2000s' },
  { index: 13, category: '2010年代', route: '/user/list/years/2010s' },
  { index: 14, category: '2020年代', route: '/user/list/years/2020s' },
]

export const timesRow: TableRowType[] = [
  { index: 1, category: '~90m', route: '/user/list/times/under90' },
  { index: 2, category: '90m~120m', route: '/user/list/times/90and120' },
  { index: 3, category: '120m~', route: '/user/list/times/over120' },
]
