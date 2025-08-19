import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Coins, 
  Building2, 
  Users, 
  TrendingUp, 
  Settings,
  Wallet,
  BarChart3,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  Bell,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Shield,
  Clock,
  Home
} from 'lucide-react';

interface RealEstateNFT {
  id: number;
  propertyName: string;
  address: string;
  image: string;
  totalValue: number;
  monthlyRent: number;
  nftShares: number;
  soldShares: number;
  status: 'active' | 'pending' | 'sold_out';
  nextPayment: string;
  yieldRate: number;
}

interface RentalToken {
  id: number;
  symbol: string;
  name: string;
  totalSupply: number;
  currentPrice: number;
  monthlyDistribution: number;
  holders: number;
  properties: number;
}

interface RentalPayment {
  id: number;
  propertyName: string;
  amount: number;
  tokenAmount: number;
  paymentDate: string;
  recipients: number;
  status: 'completed' | 'pending' | 'processing';
}

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [properties] = useState<RealEstateNFT[]>([
    {
      id: 1,
      propertyName: 'Luxury Apartment Complex - Beşiktaş',
      address: 'Beşiktaş, İstanbul',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400',
      totalValue: 2500000,
      monthlyRent: 15000,
      nftShares: 1000,
      soldShares: 850,
      status: 'active',
      nextPayment: '2025-02-01',
      yieldRate: 7.2
    },
    {
      id: 2,
      propertyName: 'Commercial Office Building - Levent',
      address: 'Levent, İstanbul',
      image: 'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=400',
      totalValue: 5000000,
      monthlyRent: 35000,
      nftShares: 2000,
      soldShares: 1200,
      status: 'active',
      nextPayment: '2025-02-01',
      yieldRate: 8.4
    },
    {
      id: 3,
      propertyName: 'Seaside Villa - Bodrum',
      address: 'Bodrum, Muğla',
      image: 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=400',
      totalValue: 1800000,
      monthlyRent: 8000,
      nftShares: 500,
      soldShares: 0,
      status: 'pending',
      nextPayment: '2025-03-01',
      yieldRate: 5.3
    }
  ]);

  const [rentalTokens] = useState<RentalToken[]>([
    {
      id: 1,
      symbol: 'RENT',
      name: 'RealEstate Rental Token',
      totalSupply: 10000000,
      currentPrice: 0.15,
      monthlyDistribution: 58000,
      holders: 2050,
      properties: 2
    }
  ]);

  const [recentPayments] = useState<RentalPayment[]>([
    {
      id: 1,
      propertyName: 'Luxury Apartment Complex - Beşiktaş',
      amount: 15000,
      tokenAmount: 100000,
      paymentDate: '2025-01-01',
      recipients: 850,
      status: 'completed'
    },
    {
      id: 2,
      propertyName: 'Commercial Office Building - Levent',
      amount: 35000,
      tokenAmount: 233333,
      paymentDate: '2025-01-01',
      recipients: 1200,
      status: 'completed'
    },
    {
      id: 3,
      propertyName: 'Luxury Apartment Complex - Beşiktaş',
      amount: 15000,
      tokenAmount: 100000,
      paymentDate: '2025-02-01',
      recipients: 850,
      status: 'pending'
    }
  ]);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'properties', label: 'Emlak Yönetimi', icon: Building2 },
    { id: 'tokens', label: 'Kira Token Yönetimi', icon: Coins },
    { id: 'payments', label: 'Kira Ödemeleri', icon: DollarSign },
    { id: 'nft-holders', label: 'NFT Sahipleri', icon: Users },
    { id: 'analytics', label: 'Analitikler', icon: BarChart3 },
    { id: 'documents', label: 'Belgeler & Tapular', icon: FileText },
    { id: 'settings', label: 'Ayarlar', icon: Settings },
  ];

  const DashboardContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Emlak NFT Dashboard</h1>
          <p className="text-gray-400 mt-1">Emlak tokenizasyonu ve kira dağıtım sistemi</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
            <Building2 className="w-4 h-4" />
            Yeni Emlak Ekle
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
            <DollarSign className="w-4 h-4" />
            Kira Dağıt
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-xl border border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm">Toplam Emlak Değeri</p>
              <p className="text-2xl font-bold text-white">₺9.3M</p>
              <p className="text-green-400 text-sm">3 aktif emlak</p>
            </div>
            <Building2 className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-xl border border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm">Aylık Kira Geliri</p>
              <p className="text-2xl font-bold text-white">₺58,000</p>
              <p className="text-green-400 text-sm">%12.5 artış</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-xl border border-purple-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm">NFT Sahipleri</p>
              <p className="text-2xl font-bold text-white">2,050</p>
              <p className="text-green-400 text-sm">+156 bu ay</p>
            </div>
            <Users className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-900 to-orange-800 p-6 rounded-xl border border-orange-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-200 text-sm">Ortalama Getiri</p>
              <p className="text-2xl font-bold text-white">%7.8</p>
              <p className="text-green-400 text-sm">Yıllık bazda</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Son Kira Ödemeleri</h3>
          <div className="space-y-4">
            {recentPayments.slice(0, 3).map((payment) => (
              <div key={payment.id} className="flex items-center gap-4 p-3 bg-gray-700 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white text-sm">{payment.propertyName}</p>
                  <p className="text-xs text-gray-400">{payment.recipients} NFT sahibine dağıtıldı</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">₺{payment.amount.toLocaleString()}</p>
                  <p className="text-xs text-blue-400">{payment.tokenAmount.toLocaleString()} RENT</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    payment.status === 'completed' ? 'bg-green-900 text-green-200' :
                    payment.status === 'processing' ? 'bg-blue-900 text-blue-200' :
                    'bg-yellow-900 text-yellow-200'
                  }`}>
                    {payment.status === 'completed' ? 'Tamamlandı' : 
                     payment.status === 'processing' ? 'İşleniyor' : 'Bekliyor'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Emlak Portföyü</h3>
          <div className="space-y-4">
            {properties.slice(0, 3).map((property) => (
              <div key={property.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-white text-sm">{property.propertyName}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {property.address}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">%{property.yieldRate}</p>
                    <p className="text-xs text-green-400">Yıllık getiri</p>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Değer: ₺{property.totalValue.toLocaleString()}</span>
                  <span>NFT: {property.soldShares}/{property.nftShares}</span>
                </div>
                <div className="mt-2 bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${(property.soldShares / property.nftShares) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Otomatik Kira Dağıtım Sistemi</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg">
            <Clock className="w-8 h-8 text-blue-400 mb-3" />
            <h4 className="text-white font-semibold mb-2">Sonraki Ödeme</h4>
            <p className="text-blue-200 text-sm">1 Şubat 2025</p>
            <p className="text-blue-300 text-xs">₺58,000 dağıtılacak</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-900 to-green-800 rounded-lg">
            <Shield className="w-8 h-8 text-green-400 mb-3" />
            <h4 className="text-white font-semibold mb-2">Akıllı Kontrat</h4>
            <p className="text-green-200 text-sm">Aktif</p>
            <p className="text-green-300 text-xs">Otomatik dağıtım açık</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg">
            <Coins className="w-8 h-8 text-purple-400 mb-3" />
            <h4 className="text-white font-semibold mb-2">Token Rezervi</h4>
            <p className="text-purple-200 text-sm">8.5M RENT</p>
            <p className="text-purple-300 text-xs">6 aylık rezerv</p>
          </div>
        </div>
      </div>
    </div>
  );

  const PropertyManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Emlak Yönetimi</h1>
        <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
          <PlusCircle className="w-4 h-4" />
          Yeni Emlak Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-blue-500 transition-all duration-300">
            <div className="relative">
              <img src={property.image} alt={property.propertyName} className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  property.status === 'active' ? 'bg-green-900 text-green-200' :
                  property.status === 'sold_out' ? 'bg-blue-900 text-blue-200' :
                  'bg-yellow-900 text-yellow-200'
                }`}>
                  {property.status === 'active' ? 'Aktif' : 
                   property.status === 'sold_out' ? 'Tükendi' : 'Beklemede'}
                </span>
              </div>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 px-2 py-1 rounded">
                <p className="text-white text-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {property.address}
                </p>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{property.propertyName}</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-400">Toplam Değer</p>
                  <p className="text-sm font-semibold text-white">₺{property.totalValue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Aylık Kira</p>
                  <p className="text-sm font-semibold text-white">₺{property.monthlyRent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Yıllık Getiri</p>
                  <p className="text-sm font-semibold text-green-400">%{property.yieldRate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">NFT Satış</p>
                  <p className="text-sm font-semibold text-white">{property.soldShares}/{property.nftShares}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>NFT Satış Durumu</span>
                  <span>{Math.round((property.soldShares / property.nftShares) * 100)}%</span>
                </div>
                <div className="bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                    style={{ width: `${(property.soldShares / property.nftShares) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-gray-400">Sonraki Ödeme</span>
                <span className="text-xs text-blue-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {property.nextPayment}
                </span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm transition-colors">
                  Detaylar
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm transition-colors">
                  <DollarSign className="w-4 h-4" />
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-lg text-sm transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Emlak Ekleme Sihirbazı</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Emlak Adı</label>
              <input 
                type="text" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Örn: Luxury Residence - Nişantaşı"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Adres</label>
              <input 
                type="text" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tam adres bilgisi"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Toplam Değer (₺)</label>
              <input 
                type="number" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2500000"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Aylık Kira (₺)</label>
              <input 
                type="number" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="15000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">NFT Parça Sayısı</label>
              <input 
                type="number" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tapu Belgesi</label>
              <input 
                type="file" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept=".pdf,.jpg,.png"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-2 rounded-lg transition-all">
            Emlak Ekle ve NFT Oluştur
          </button>
        </div>
      </div>
    </div>
  );

  const RentalPayments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Kira Ödemeleri</h1>
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
          <DollarSign className="w-4 h-4" />
          Manuel Ödeme Yap
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-xl border border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm">Bu Ay Toplam</p>
              <p className="text-2xl font-bold text-white">₺58,000</p>
              <p className="text-green-400 text-sm">2,050 NFT sahibine</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-xl border border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-sm">Token Dağıtımı</p>
              <p className="text-2xl font-bold text-white">333,333</p>
              <p className="text-blue-400 text-sm">RENT token</p>
            </div>
            <Coins className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-xl border border-purple-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm">Ortalama Ödeme</p>
              <p className="text-2xl font-bold text-white">₺28.3</p>
              <p className="text-purple-400 text-sm">NFT başına</p>
            </div>
            <Users className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">Ödeme Geçmişi</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-750">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Emlak</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Kira Tutarı</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Token Miktarı</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Alıcı Sayısı</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tarih</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {recentPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{payment.propertyName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    ₺{payment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {payment.tokenAmount.toLocaleString()} RENT
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {payment.recipients.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {payment.paymentDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      payment.status === 'completed' ? 'bg-green-900 text-green-200' :
                      payment.status === 'processing' ? 'bg-blue-900 text-blue-200' :
                      'bg-yellow-900 text-yellow-200'
                    }`}>
                      {payment.status === 'completed' ? 'Tamamlandı' : 
                       payment.status === 'processing' ? 'İşleniyor' : 'Bekliyor'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Otomatik Ödeme Ayarları</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div>
                <p className="text-white font-medium">Otomatik Dağıtım</p>
                <p className="text-gray-400 text-sm">Her ayın 1'inde otomatik ödeme</p>
              </div>
              <div className="w-12 h-6 bg-green-600 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div>
                <p className="text-white font-medium">Akıllı Kontrat</p>
                <p className="text-gray-400 text-sm">Blockchain üzerinde otomatik işlem</p>
              </div>
              <div className="w-12 h-6 bg-green-600 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Minimum Ödeme Tutarı (₺)</label>
              <input 
                type="number" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Gas Fee Rezervi (%)</label>
              <input 
                type="number" 
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'properties':
        return <PropertyManagement />;
      case 'payments':
        return <RentalPayments />;
      case 'tokens':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Kira Token Yönetimi</h1>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4">RENT Token Detayları</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-4 bg-blue-900 rounded-lg">
                  <p className="text-blue-200 text-sm">Toplam Arz</p>
                  <p className="text-xl font-bold text-white">10M RENT</p>
                </div>
                <div className="p-4 bg-green-900 rounded-lg">
                  <p className="text-green-200 text-sm">Aylık Dağıtım</p>
                  <p className="text-xl font-bold text-white">333K RENT</p>
                </div>
                <div className="p-4 bg-purple-900 rounded-lg">
                  <p className="text-purple-200 text-sm">Token Sahipleri</p>
                  <p className="text-xl font-bold text-white">2,050</p>
                </div>
                <div className="p-4 bg-orange-900 rounded-lg">
                  <p className="text-orange-200 text-sm">Token Fiyatı</p>
                  <p className="text-xl font-bold text-white">$0.15</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'nft-holders':
        return (
          <div className="text-center text-white py-12">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">NFT Sahipleri</h2>
            <p className="text-gray-400">NFT sahipleri yönetim paneli geliştiriliyor...</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="text-center text-white py-12">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Detaylı Analitikler</h2>
            <p className="text-gray-400">Gelişmiş analitik dashboard geliştiriliyor...</p>
          </div>
        );
      case 'documents':
        return (
          <div className="text-center text-white py-12">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Belgeler & Tapular</h2>
            <p className="text-gray-400">Belge yönetim sistemi geliştiriliyor...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center text-white py-12">
            <Settings className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Sistem Ayarları</h2>
            <p className="text-gray-400">Konfigürasyon seçenekleri geliştiriliyor...</p>
          </div>
        );
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">RealEstate NFT</h1>
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;