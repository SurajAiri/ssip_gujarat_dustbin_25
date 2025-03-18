import React from 'react';
import { Truck, Map, Calendar, BarChart, Droplet, Leaf, Info, ExternalLink, ArrowRight, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { APP_NAME, GOVERNMENT } from '@/utils/contants';
import CustomHeader from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

const LandingScreen = () => {
  const navigate  = useNavigate();
  function handleReportIssue(): void {
    navigate('/report');
  }

  function handleViewBins(): void {
    navigate('/bin-map');
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <CustomHeader />
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Smart Waste Collection Management
              </h1>
              <p className="mt-4 text-lg text-blue-100">
                An initiative by {GOVERNMENT} to optimize waste collection and make our cities cleaner and greener.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50" onClick={handleReportIssue}>
                  Report an Issue
                  <Droplet className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg"  className="bg-white text-blue-700 hover:bg-blue-50" onClick={handleViewBins}>
                  View Bin Locations
                  <Map className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-blue-700 p-6 rounded-lg shadow-lg relative flex flex-col items-center justify-center text-center h-64">
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-blue-900 text-xs font-bold px-2 py-1 rounded">
                  Official Portal
                </div>
                <Truck className="h-20 w-20 mb-4 text-blue-100" />
                <p className="text-blue-100 text-lg font-medium">Smart Waste Collection</p>
                <p className="text-blue-200 text-sm">Efficient • Sustainable • Smart</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Access various waste management services through our integrated digital platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-t-4 border-t-blue-600">
              <CardContent className="pt-6">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Map className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Bin Locations</h3>
                <p className="text-gray-600 mb-4">
                  View nearby waste collection bins and their current status on an interactive map.
                </p>
                <Button variant="ghost" className="text-blue-700 hover:bg-blue-50 p-0">
                  Show Bins
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-green-600">
              <CardContent className="pt-6">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Schedule Pickup</h3>
                <p className="text-gray-600 mb-4">
                  Request waste collection services or check the scheduled pickup times for your area.
                </p>
                <Button variant="ghost" className="text-green-700 hover:bg-green-50 p-0">
                  Schedule Now
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-t-4 border-t-red-600">
              <CardContent className="pt-6">
                <div className="bg-red-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Droplet className="h-6 w-6 text-red-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Report Issues</h3>
                <p className="text-gray-600 mb-4">
                  Report overflowing bins, missed collections, or other waste management issues in your area.
                </p>
                <Button variant="ghost" className="text-red-700 hover:bg-red-50 p-0">
                  Report Now
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Information System Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Waste Management Information System</h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Track and visualize waste collection data across the city
            </p>
          </div>
          
          <Tabs defaultValue="visualize" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="visualize">Visualize Data</TabsTrigger>
              <TabsTrigger value="information">Information</TabsTrigger>
              <TabsTrigger value="pickup">Pickup Planning</TabsTrigger>
              <TabsTrigger value="resolve">Issue Resolution</TabsTrigger>
            </TabsList>
            
            <TabsContent value="visualize" className="mt-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <BarChart className="h-5 w-5 text-blue-600" />
                        <h3 className="text-xl font-bold">Data Visualization</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Get insights into waste collection patterns, bin utilization, and collection efficiency through interactive charts and graphs.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-blue-100 p-1 mt-1">
                            <div className="rounded-full bg-blue-600 h-2 w-2"></div>
                          </div>
                          <span className="text-gray-700">Real-time bin status monitoring</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-blue-100 p-1 mt-1">
                            <div className="rounded-full bg-blue-600 h-2 w-2"></div>
                          </div>
                          <span className="text-gray-700">Waste collection trends and analytics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-blue-100 p-1 mt-1">
                            <div className="rounded-full bg-blue-600 h-2 w-2"></div>
                          </div>
                          <span className="text-gray-700">Performance metrics for collection teams</span>
                        </li>
                      </ul>
                      <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                        View Visualizations
                      </Button>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center justify-center h-64">
                      <BarChart className="h-16 w-16 text-blue-600 mb-4" />
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-800">Interactive Data Dashboard</p>
                        <p className="text-sm text-gray-500">View waste collection metrics and trends</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="information" className="mt-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Info className="h-5 w-5 text-blue-600" />
                        <h3 className="text-xl font-bold">Information System</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Access comprehensive information about waste management processes, guidelines, and regulations.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-blue-100 p-1 mt-1">
                            <div className="rounded-full bg-blue-600 h-2 w-2"></div>
                          </div>
                          <span className="text-gray-700">Waste segregation guidelines</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-blue-100 p-1 mt-1">
                            <div className="rounded-full bg-blue-600 h-2 w-2"></div>
                          </div>
                          <span className="text-gray-700">Collection schedules and routes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-blue-100 p-1 mt-1">
                            <div className="rounded-full bg-blue-600 h-2 w-2"></div>
                          </div>
                          <span className="text-gray-700">Public awareness materials and resources</span>
                        </li>
                      </ul>
                      <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                        Access Information
                      </Button>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center justify-center h-64">
                      <Info className="h-16 w-16 text-blue-600 mb-4" />
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-800">Knowledge Center</p>
                        <p className="text-sm text-gray-500">Guidelines, schedules, and educational resources</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pickup" className="mt-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <h3 className="text-xl font-bold">Pickup Planning</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Intelligent scheduling and route optimization for waste collection vehicles.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-blue-100 p-1 mt-1">
                            <div className="rounded-full bg-blue-600 h-2 w-2"></div>
                          </div>
                          <span className="text-gray-700">Smart bin selection based on fill percentage</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-blue-100 p-1 mt-1">
                            <div className="rounded-full bg-blue-600 h-2 w-2"></div>
                          </div>
                          <span className="text-gray-700">Priority settings for 90%+ filled bins</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-blue-100 p-1 mt-1">
                            <div className="rounded-full bg-blue-600 h-2 w-2"></div>
                          </div>
                          <span className="text-gray-700">Route optimization for efficiency</span>
                        </li>
                      </ul>
                      <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                        View Pickup Plans
                      </Button>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center justify-center h-64">
                      <Truck className="h-16 w-16 text-blue-600 mb-4" />
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-800">Route Optimization</p>
                        <p className="text-sm text-gray-500">Smart scheduling and efficient collection</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resolve" className="mt-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Leaf className="h-5 w-5 text-blue-600" />
                        <h3 className="text-xl font-bold">Issue Resolution</h3>
                      </div>
                      <p className="text-gray-600 mb-4">
                        Track and resolve citizen complaints and waste management issues efficiently.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-blue-100 p-1 mt-1">
                            <div className="rounded-full bg-blue-600 h-2 w-2"></div>
                          </div>
                          <span className="text-gray-700">Complaint management system</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-blue-100 p-1 mt-1">
                            <div className="rounded-full bg-blue-600 h-2 w-2"></div>
                          </div>
                          <span className="text-gray-700">Real-time issue tracking</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="rounded-full bg-blue-100 p-1 mt-1">
                            <div className="rounded-full bg-blue-600 h-2 w-2"></div>
                          </div>
                          <span className="text-gray-700">Resolution workflow and status updates</span>
                        </li>
                      </ul>
                      <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                        Resolve Issues
                      </Button>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center justify-center h-64">
                      <CheckCircle className="h-16 w-16 text-green-600 mb-4" />
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-800">Issue Tracking System</p>
                        <p className="text-sm text-gray-500">Report and monitor resolution progress</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              A simple and efficient process for waste management
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Report or Monitor</h3>
              <p className="text-gray-600">
                Citizens can report issues or check bin status. Administrators monitor bin fill levels through the dashboard.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Process & Schedule</h3>
              <p className="text-gray-600">
                The system prioritizes bins with 90%+ fill levels and schedules pickups based on capacity and routes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Complete & Track</h3>
              <p className="text-gray-600">
                Collection teams complete assigned routes, while citizens and administrators can track progress in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold mb-2">150+</p>
              <p className="text-blue-200">Collection Vehicles</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold mb-2">5,000+</p>
              <p className="text-blue-200">Waste Bins Monitored</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold mb-2">95%</p>
              <p className="text-blue-200">Timely Collections</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold mb-2">85%</p>
              <p className="text-blue-200">Citizen Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Join Our Clean City Initiative</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Be a responsible citizen and help us keep our city clean by using our waste management services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={handleReportIssue}>
              Report an Issue 
              <Droplet className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50" onClick={handleViewBins}>
              View Bin Locations
              <Map className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingScreen;