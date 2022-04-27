import { useMemo } from "react"
import { ExtensionOutlined, VisibilityOutlined } from "@mui/icons-material"

import { TProcess } from "models/process"

import { useProcessesPage } from "pages/processes/hooks/useProcessesPage"

import { getLongFormatByDate } from "shared/utils/date"


export function useTable(processes: TProcess[]) {
  const processPage = useProcessesPage()

  const columnData = useMemo(() => {
    return [
      { id: 'name', name: 'Name' },
      { id: 'id', name: 'ID' },
      { id: 'status', name: 'Status' },
      { id: 'createdAt', name: 'Created at' },
      { id: 'actions', name: 'Actions' },
    ]
  }, [])

  const rows = useMemo(() => {
    return processes.map(process => {
      const items = [
        process.state.node_name,
        process.id,
        process.status,
        getLongFormatByDate(process.created_at)
      ]

      const actions = [
        {
          icon: VisibilityOutlined,
          tooltip: 'Ver histórico',
          onClick: () => processPage.navigateToHistory(process.id)
        },
        {
          icon: ExtensionOutlined,
          tooltip: 'Ver diagrama',
          onClick: () => { }
        },
      ]

      return { items, actions }
    })
  }, [processPage, processes])

  return { columnData, rows }
}