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
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';



const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Artigos' }]


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data.results);
      } catch (error) {
        console.error('Erro ao obter os posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Estrutura html que exibe os posts
  return (
    <main>
      <div className='container'>
        <PageHeader title="Artigos" breadcrumbs={breadcrumbs} />
        <DataTable
          value={posts}
          // selection={selectedCategories}
          //selectionMode="multiple"
          //onSelectionChange={(e) => setSelectedCategories(e.value)}
          //loading={loading} usar posteriormente
          dataKey="id"
          paginator
          rows={10}
          emptyMessage="Nenhuma categoria encontrada"
        >
          {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} /> */}
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
                <Link href={`/categorias/${post.id}`}>
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
