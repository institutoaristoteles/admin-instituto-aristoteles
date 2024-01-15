'use client'

import { getPosts } from '@/app/(admin)/artigos/postsApi'; // problema de importação de Post
import { BreadcrumbItem } from '@/shared/components/breadcrumbs';
import PageHeader from '@/shared/components/page-header';
import PostStatusTable from '@/shared/components/post-status-table';
import UserAvatarTable from '@/shared/components/user-avatar-table';
import { Post } from '@/shared/models/post';
import { dateFormatter } from '@/shared/utils/date';
import Link from 'next/link';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableStateEvent } from 'primereact/datatable';
import { useEffect, useState } from 'react';



const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [first,setFirst] = useState(0)
  const [page,setPage] = useState(0)
  const [loading,setLoading] = useState(false)
  const pageSize = 6
  const [selectedPosts, setSelectedPosts] = useState<Post[]>([])


  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Artigos' }]


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        console.log(page)
        const data = await getPosts({page: page+1,pageSize});
        console.log(data)
        setPosts(data.results);
      } catch (error) {
        console.error('Erro ao obter os posts:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchPosts();
  }, [page]);

  const onPageChange = (event:DataTableStateEvent) => {
    console.log(event)
    setPage(event.page || 0)
    setFirst(event.first)
  }

  // Estrutura html que exibe os posts
  return (
    <main>
      <div className='container'>
        <PageHeader title="Artigos" breadcrumbs={breadcrumbs} />
        <DataTable
          value={posts}
          selection={selectedPosts}
          selectionMode="multiple"
          onSelectionChange={(e) => setSelectedPosts(e.value)}
          dataKey="id"
          paginator
          lazy
          totalRecords={5000}
          onPage={onPageChange}
          first={first}
          rows={pageSize}
          emptyMessage="Nenhuma categoria encontrada"
          loading= {loading}
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
            body={(post: Post) => (
              <PostStatusTable status={post.status}/>
            )}
          />
          <Column
            header={<span className="whitespace-nowrap">Autor</span>}
            body={(post: Post) => (
              <UserAvatarTable user={post.createdBy}/>
            )}
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
                // onClick={() => confirmCategoryRemoval(category)}
                />
              </div>
            )}
          />
        </DataTable>
      </div>
    </main>
  );
};

export default PostsPage;
