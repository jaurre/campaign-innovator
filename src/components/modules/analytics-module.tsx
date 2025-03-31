import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BarChart as BarChartIcon, 
  BarChartHorizontal, 
  Calendar, 
  Info, 
  TrendingUp 
} from "lucide-react";
import { useContent } from "@/contexts/content-context";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const performanceData = [
  { name: "Lun", engagement: 120, clicks: 20, reach: 800 },
  { name: "Mar", engagement: 180, clicks: 35, reach: 1200 },
  { name: "Mie", engagement: 250, clicks: 40, reach: 1500 },
  { name: "Jue", engagement: 320, clicks: 55, reach: 1800 },
  { name: "Vie", engagement: 400, clicks: 70, reach: 2200 },
  { name: "Sab", engagement: 450, clicks: 90, reach: 2500 },
  { name: "Dom", engagement: 500, clicks: 100, reach: 3000 },
];

const contentTypeData = [
  { name: "Informativo", value: 35 },
  { name: "Promocional", value: 25 },
  { name: "Educativo", value: 20 },
  { name: "Entretenimiento", value: 15 },
  { name: "Testimonial", value: 5 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"];

const platformData = [
  { name: "Facebook", engagement: 560, clicks: 120 },
  { name: "Instagram", engagement: 720, clicks: 150 },
  { name: "Twitter", engagement: 320, clicks: 80 },
  { name: "LinkedIn", engagement: 400, clicks: 90 },
];

const recommendations = [
  "El contenido promocional genera mayor interacción los fines de semana",
  "Los posts educativos tienen mejor rendimiento en LinkedIn",
  "Publicaciones con imágenes aumentan el engagement un 40%",
  "El horario óptimo para publicar es entre 18:00 y 20:00 hrs",
  "Contenidos con infografías tienen más probabilidad de ser compartidos",
];

export function AnalyticsModule() {
  const { businessInfo } = useContent();
  const { toast } = useToast();

  const generateReport = () => {
    toast({
      title: "Generando reporte",
      description: "El reporte completo estará disponible en breve para su descarga.",
      duration: 3000,
    });
  };

  return (
    <div className="w-full fade-in">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChartIcon className="h-6 w-6 text-accent" />
            <CardTitle className="text-2xl">Análisis Estratégico</CardTitle>
          </div>
          <CardDescription>
            Rendimiento de campañas anteriores y recomendaciones para {businessInfo.name || "tu negocio"}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Engagement Promedio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87%</div>
            <p className="text-sm text-muted-foreground">+12% vs periodo anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChartHorizontal className="h-5 w-5 text-blue-500" />
              Tasa de Conversión
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.2%</div>
            <p className="text-sm text-muted-foreground">+0.8% vs periodo anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              Mejor Día
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Viernes</div>
            <p className="text-sm text-muted-foreground">Mayor engagement y conversión</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="h-[400px]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Rendimiento Semanal</span>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <p className="text-sm">
                    Este gráfico muestra el engagement, clicks y alcance diario durante la última semana. Puedes identificar los días con mejor rendimiento.
                  </p>
                </HoverCardContent>
              </HoverCard>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={performanceData}
                margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="engagement" fill="#8884d8" />
                <Bar yAxisId="left" dataKey="clicks" fill="#82ca9d" />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="reach"
                  fill="#ffc658"
                  stroke="#ffc658"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="h-[400px]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Distribución por Tipo de Contenido</span>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <p className="text-sm">
                    Este gráfico muestra qué tipos de contenido han generado mayor engagement. Usa esta información para planificar tus próximas publicaciones.
                  </p>
                </HoverCardContent>
              </HoverCard>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Rendimiento por Plataforma</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={platformData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="engagement" fill="#8884d8" name="Engagement" />
                <Bar dataKey="clicks" fill="#82ca9d" name="Clicks" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recomendaciones Estratégicas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-accent-foreground text-xs font-bold">{index + 1}</span>
                  </div>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button onClick={generateReport} className="w-full">
                Generar Reporte Completo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
