'use client'

import PostStatusTable from '@/shared/components/post-status-table'
import UserAvatarTable from '@/shared/components/user-avatar-table'
import { Post } from '@/shared/models/post'
import {
  deletePost,
  deletePosts,
  getPosts,
} from '@/shared/services/posts.service'
import { dateFormatter } from '@/shared/utils/date'
import Link from 'next/link'
import { PrimeIcons } from 'primereact/api'
import { Badge } from 'primereact/badge'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { DataTable, DataTableStateEvent } from 'primereact/datatable'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function PostsTable() {
  const [posts, setPosts] = useState<Post[]>([])
  const [first, setFirst] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [selectedPosts, setSelectedPosts] = useState<Post[]>([])
  const [totalSize, setTotalSize] = useState(0)
  const pageSize = 6

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true)
      const { results, totalSize } = await getPosts({
        page: page + 1,
        pageSize,
      })
      setPosts(results)
      setTotalSize(totalSize)
    } catch (error) {
      console.error('Erro ao obter os posts:', error)
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    ;(async () => await loadPosts())()
  }, [loadPosts, page])

  const onPageChange = useCallback((event: DataTableStateEvent) => {
    setPage(event.page || 0)
    setFirst(event.first)
  }, [])

  const removePost = useCallback(
    async (id: string) => {
      try {
        setLoading(true)
        await deletePost(id)
        await loadPosts()
        setSelectedPosts([])
        toast.success('Artigo removido com sucesso')
      } catch (e) {
        toast.error('Ocorreu um erro ao remover este artigo')
      } finally {
        setLoading(false)
      }
    },
    [loadPosts],
  )

  const confirmPostRemoval = useCallback(
    (post: Post) => {
      confirmDialog({
        message: `Tem certeza que deseja excluir o artigo ${post.title}?`,
        header: 'Excluir artigo',
        icon: PrimeIcons.TRASH,
        acceptClassName: 'p-button-danger',
        rejectLabel: 'Não, cancelar',
        acceptLabel: 'Sim, excluir',
        accept: async () => await removePost(post.id),
      })
    },
    [removePost],
  )

  const removeAllSelected = useCallback(async () => {
    try {
      setLoading(true)
      const ids = selectedPosts.map((post) => post.id)
      if (ids.length <= 0) return

      await deletePosts(...ids)
      await loadPosts()
      toast.success(`${selectedPosts.length} artigos(s) removidas com sucesso`)
      setSelectedPosts([])
    } catch (e) {
      toast.error('Ocorreu um erro ao remover os artigos')
    } finally {
      setLoading(false)
    }
  }, [loadPosts, selectedPosts])

  const confirmCategoriesRemoval = useCallback(() => {
    confirmDialog({
      message: (
        <>
          Tem certeza que deseja excluir os seguintes artigos?
          <ul className="pl-5 pt-5">
            {selectedPosts.map((post) => (
              <li key={post.id} className="list-disc">
                {post.title}
              </li>
            ))}
          </ul>
        </>
      ),
      header: 'Excluir artigos',
      icon: PrimeIcons.TRASH,
      acceptClassName: 'p-button-danger',
      rejectLabel: 'Não, cancelar',
      acceptLabel: 'Sim, excluir',
      accept: removeAllSelected,
    })
  }, [removeAllSelected, selectedPosts])

  return (
    <React.Fragment>
      <header className="flex items-center justify-between gap-5 pb-5">
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/artigos/novo">
            <Button label="Adicionar" icon={PrimeIcons.PLUS} size="small" />
          </Link>

          {selectedPosts.length > 0 && (
            <Button
              label="Excluir"
              icon={PrimeIcons.TRASH}
              size="small"
              severity="danger"
              onClick={confirmCategoriesRemoval}
              loading={loading}
              outlined
            >
              <Badge
                value={selectedPosts.length.toString()}
                severity="danger"
              />
            </Button>
          )}
        </div>
      </header>

      <DataTable
        value={posts}
        selection={selectedPosts}
        selectionMode="multiple"
        onSelectionChange={(e) => setSelectedPosts(e.value)}
        dataKey="id"
        paginator
        lazy
        totalRecords={totalSize}
        onPage={onPageChange}
        first={first}
        rows={pageSize}
        emptyMessage="Nenhuma categoria encontrada"
        loading={loading}
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
        <Column
          header="Título"
          headerStyle={{ width: '100%' }}
          body={(category: Post) => (
            <span className="font-bold text-sm whitespace-nowrap">
              {category.title}
            </span>
          )}
        />
        <Column
          header={<span className="whitespace-nowrap">Status</span>}
          body={(post: Post) => <PostStatusTable status={post.status} />}
        />
        <Column
          header={<span className="whitespace-nowrap">Autor</span>}
          body={(post: Post) => <UserAvatarTable user={post.createdBy} />}
        />
        <Column
          header={<span className="whitespace-nowrap">Data de criação</span>}
          body={(post: Post) => (
            <time className="w-min block whitespace-nowrap text-sm text-text-color-secondary">
              {dateFormatter.format(new Date(post.createdAt))}
            </time>
          )}
        />
        <Column
          header={<span className="whitespace-nowrap">Última atualização</span>}
          body={(post: Post) => (
            <time className="w-min block whitespace-nowrap text-sm text-text-color-secondary">
              {dateFormatter.format(new Date(post.updatedAt))}
            </time>
          )}
        />
        <Column
          body={(post: Post) => (
            <div className="flex items-center gap-2">
              <Link href={`/artigos/${post.id}`}>
                <Button icon={PrimeIcons.PENCIL} text rounded severity="info" />
              </Link>

              <Button
                icon={PrimeIcons.TRASH}
                text
                rounded
                severity="danger"
                onClick={() => confirmPostRemoval(post)}
              />
            </div>
          )}
        />
      </DataTable>

      <ConfirmDialog />
    </React.Fragment>
  )
}
