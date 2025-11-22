import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: number;
  user: string;
  text: string;
  avatar: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  rank: string;
  avatar: string;
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
}

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [activeTab, setActiveTab] = useState('gallery');
  
  const [gallery, setGallery] = useState<GalleryImage[]>([
    {
      id: 1,
      url: 'https://cdn.poehali.dev/projects/c8f86543-da64-460b-90ab-fa3069bb484d/files/50007f1b-aa2d-4bbb-acbf-da4e93431cfc.jpg',
      title: 'ACE на Haven',
      likes: 24,
      comments: [
        { id: 1, user: 'Jett_Pro', text: 'Безумный выстрел! 🔥', avatar: '🎯' }
      ]
    },
    {
      id: 2,
      url: 'https://cdn.poehali.dev/projects/c8f86543-da64-460b-90ab-fa3069bb484d/files/6e6f1a02-bcae-4ebf-84c4-59624a328dec.jpg',
      title: 'Clutch 1v3',
      likes: 42,
      comments: [
        { id: 2, user: 'Sage_Main', text: 'Невероятно!', avatar: '💚' }
      ]
    },
    {
      id: 3,
      url: 'https://cdn.poehali.dev/projects/c8f86543-da64-460b-90ab-fa3069bb484d/files/8dfc257c-2c64-46d5-86e3-23e013e22b34.jpg',
      title: 'Победа команды',
      likes: 56,
      comments: []
    }
  ]);

  const teamMembers: TeamMember[] = [
    { id: 1, name: 'Phoenix', role: 'Duelist', rank: 'Immortal 3', avatar: '🔥' },
    { id: 2, name: 'Sage', role: 'Sentinel', rank: 'Immortal 2', avatar: '💚' },
    { id: 3, name: 'Sova', role: 'Initiator', rank: 'Immortal 3', avatar: '⚡' },
    { id: 4, name: 'Brimstone', role: 'Controller', rank: 'Immortal 1', avatar: '☁️' },
    { id: 5, name: 'Jett', role: 'Duelist', rank: 'Radiant', avatar: '🎯' }
  ];

  const news: NewsItem[] = [
    { id: 1, title: 'Победа в турнире!', date: '20.11.2025', content: 'Наша команда заняла первое место в региональном турнире' },
    { id: 2, title: 'Новый участник', date: '18.11.2025', content: 'Jett присоединился к команде в качестве основного дуэлиста' },
    { id: 3, title: 'Тренировки', date: '15.11.2025', content: 'Проведена серия тренировочных матчей с топовыми командами' }
  ];

  const stats = {
    wins: 156,
    losses: 84,
    winRate: 65,
    avgRounds: 13.5
  };

  const handleLike = (imageId: number) => {
    setGallery(gallery.map(img => 
      img.id === imageId ? { ...img, likes: img.likes + 1 } : img
    ));
  };

  const handleAddComment = (imageId: number) => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now(),
      user: 'Player',
      text: newComment,
      avatar: '👤'
    };

    setGallery(gallery.map(img =>
      img.id === imageId
        ? { ...img, comments: [...img.comments, comment] }
        : img
    ));

    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 pointer-events-none" />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <header className="mb-12 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-6xl font-display mb-2 glow-text">VALORANT TEAM</h1>
                <p className="text-muted-foreground text-lg">TACTICAL EXCELLENCE</p>
              </div>
              <div className="flex gap-3">
                <Button className="valorant-border hover-glow bg-primary text-primary-foreground">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить фото
                </Button>
              </div>
            </div>
          </header>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8 bg-card/50 backdrop-blur-sm valorant-border p-1">
              <TabsTrigger value="gallery" className="font-display">
                <Icon name="Image" size={18} className="mr-2" />
                ГАЛЕРЕЯ
              </TabsTrigger>
              <TabsTrigger value="team" className="font-display">
                <Icon name="Users" size={18} className="mr-2" />
                КОМАНДА
              </TabsTrigger>
              <TabsTrigger value="news" className="font-display">
                <Icon name="Newspaper" size={18} className="mr-2" />
                НОВОСТИ
              </TabsTrigger>
              <TabsTrigger value="stats" className="font-display">
                <Icon name="BarChart3" size={18} className="mr-2" />
                СТАТИСТИКА
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gallery" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((image) => (
                  <Card key={image.id} className="valorant-border bg-card/80 backdrop-blur-sm hover-glow overflow-hidden group transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <CardContent className="p-4">
                      <h3 className="font-display text-xl mb-3">{image.title}</h3>
                      
                      <div className="flex gap-2 mb-4">
                        <Button
                          onClick={() => handleLike(image.id)}
                          variant="outline"
                          size="sm"
                          className="valorant-border hover-glow"
                        >
                          <Icon name="Heart" size={16} className="mr-1" />
                          {image.likes}
                        </Button>
                        <Button
                          onClick={() => setSelectedImage(selectedImage === image.id ? null : image.id)}
                          variant="outline"
                          size="sm"
                          className="valorant-border hover-glow"
                        >
                          <Icon name="MessageSquare" size={16} className="mr-1" />
                          {image.comments.length}
                        </Button>
                      </div>

                      {selectedImage === image.id && (
                        <div className="space-y-3 animate-fade-in">
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {image.comments.map((comment) => (
                              <div key={comment.id} className="flex gap-2 items-start bg-muted/50 p-2 rounded">
                                <span className="text-xl">{comment.avatar}</span>
                                <div className="flex-1">
                                  <p className="text-sm font-semibold text-primary">{comment.user}</p>
                                  <p className="text-sm">{comment.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex gap-2">
                            <Textarea
                              placeholder="Написать комментарий..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="flex-1 valorant-border bg-input"
                              rows={2}
                            />
                            <Button
                              onClick={() => handleAddComment(image.id)}
                              className="valorant-border hover-glow bg-primary"
                            >
                              <Icon name="Send" size={16} />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="team" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="valorant-border bg-card/80 backdrop-blur-sm hover-glow p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-3xl">
                        {member.avatar}
                      </div>
                      <div>
                        <h3 className="font-display text-2xl">{member.name}</h3>
                        <Badge className="bg-primary/20 text-primary border-primary valorant-border">
                          {member.role}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Rank:</span>
                        <span className="font-display text-primary">{member.rank}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="news" className="animate-fade-in">
              <div className="max-w-4xl mx-auto space-y-4">
                {news.map((item) => (
                  <Card key={item.id} className="valorant-border bg-card/80 backdrop-blur-sm hover-glow p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-display text-2xl">{item.title}</h3>
                      <Badge variant="outline" className="valorant-border">
                        {item.date}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{item.content}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stats" className="animate-fade-in">
              <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="valorant-border bg-card/80 backdrop-blur-sm hover-glow p-6 text-center">
                  <Icon name="Trophy" size={32} className="mx-auto mb-3 text-primary" />
                  <div className="font-display text-4xl text-primary mb-2">{stats.wins}</div>
                  <div className="text-muted-foreground">Побед</div>
                </Card>
                
                <Card className="valorant-border bg-card/80 backdrop-blur-sm hover-glow p-6 text-center">
                  <Icon name="XCircle" size={32} className="mx-auto mb-3 text-destructive" />
                  <div className="font-display text-4xl text-primary mb-2">{stats.losses}</div>
                  <div className="text-muted-foreground">Поражений</div>
                </Card>
                
                <Card className="valorant-border bg-card/80 backdrop-blur-sm hover-glow p-6 text-center">
                  <Icon name="TrendingUp" size={32} className="mx-auto mb-3 text-secondary" />
                  <div className="font-display text-4xl text-primary mb-2">{stats.winRate}%</div>
                  <div className="text-muted-foreground">Винрейт</div>
                </Card>
                
                <Card className="valorant-border bg-card/80 backdrop-blur-sm hover-glow p-6 text-center">
                  <Icon name="Target" size={32} className="mx-auto mb-3 text-primary" />
                  <div className="font-display text-4xl text-primary mb-2">{stats.avgRounds}</div>
                  <div className="text-muted-foreground">Ср. раундов</div>
                </Card>
              </div>
              
              <Card className="valorant-border bg-card/80 backdrop-blur-sm max-w-4xl mx-auto mt-6 p-6">
                <h3 className="font-display text-2xl mb-4">ГРАФИК ПОБЕД</h3>
                <div className="h-64 flex items-end justify-around gap-2">
                  {[45, 62, 38, 71, 55, 68, 73].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-gradient-to-t from-primary to-secondary valorant-border hover-glow transition-all duration-300"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-muted-foreground">Н{i + 1}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;