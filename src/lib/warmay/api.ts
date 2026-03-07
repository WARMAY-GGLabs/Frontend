// WARMAY API Client for Backend Integration

import type {
  APIResponse,
  WorldIDVerifyRequest,
  WorldIDVerifyResponse,
  MaternalUser,
  PrenatalControl,
  TokenBalance,
  TokenClaim,
  EmergencyAlert,
  TrustContact,
  ChatRequest,
  ChatResponse,
  CREWorkflowResult,
} from './types'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

class WarmayAPI {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      const data = await response.json()
      return data
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Network error',
        },
      }
    }
  }

  // ==========================================
  // World ID Authentication
  // ==========================================

  async verifyWorldID(proof: WorldIDVerifyRequest): Promise<APIResponse<WorldIDVerifyResponse>> {
    return this.request('/auth/world-id/verify', {
      method: 'POST',
      body: JSON.stringify(proof),
    })
  }

  async checkVerificationStatus(nullifierHash: string): Promise<APIResponse<{ verified: boolean }>> {
    return this.request(`/auth/world-id/status/${nullifierHash}`)
  }

  // ==========================================
  // User Management
  // ==========================================

  async getCurrentUser(): Promise<APIResponse<MaternalUser>> {
    return this.request('/user/me')
  }

  async updateUserProfile(data: Partial<MaternalUser>): Promise<APIResponse<MaternalUser>> {
    return this.request('/user/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async updateLocation(lat: number, lng: number): Promise<APIResponse<void>> {
    return this.request('/user/location', {
      method: 'POST',
      body: JSON.stringify({ lat, lng }),
    })
  }

  // ==========================================
  // Prenatal Controls
  // ==========================================

  async getControls(): Promise<APIResponse<PrenatalControl[]>> {
    return this.request('/controls')
  }

  async getControl(id: string): Promise<APIResponse<PrenatalControl>> {
    return this.request(`/controls/${id}`)
  }

  async verifyControlOnChain(controlId: string): Promise<APIResponse<CREWorkflowResult>> {
    return this.request(`/controls/${controlId}/verify`, {
      method: 'POST',
    })
  }

  // ==========================================
  // Tokens MOM
  // ==========================================

  async getTokenBalance(): Promise<APIResponse<TokenBalance>> {
    return this.request('/tokens/balance')
  }

  async claimTokens(): Promise<APIResponse<TokenClaim>> {
    return this.request('/tokens/claim', {
      method: 'POST',
    })
  }

  async getClaimHistory(): Promise<APIResponse<TokenClaim[]>> {
    return this.request('/tokens/history')
  }

  // ==========================================
  // Emergency System
  // ==========================================

  async triggerEmergency(
    type: EmergencyAlert['type'],
    location: { lat: number; lng: number }
  ): Promise<APIResponse<EmergencyAlert>> {
    return this.request('/emergency/trigger', {
      method: 'POST',
      body: JSON.stringify({ type, location }),
    })
  }

  async getActiveEmergency(): Promise<APIResponse<EmergencyAlert | null>> {
    return this.request('/emergency/active')
  }

  async cancelEmergency(id: string): Promise<APIResponse<void>> {
    return this.request(`/emergency/${id}/cancel`, {
      method: 'POST',
    })
  }

  async getNearestHospitals(lat: number, lng: number): Promise<APIResponse<EmergencyAlert['nearest_hospitals']>> {
    return this.request(`/emergency/hospitals?lat=${lat}&lng=${lng}`)
  }

  // ==========================================
  // Trust Network
  // ==========================================

  async getTrustContacts(): Promise<APIResponse<TrustContact[]>> {
    return this.request('/trust-network')
  }

  async addTrustContact(contact: Omit<TrustContact, 'id' | 'maternal_id' | 'is_verified'>): Promise<APIResponse<TrustContact>> {
    return this.request('/trust-network', {
      method: 'POST',
      body: JSON.stringify(contact),
    })
  }

  async removeTrustContact(id: string): Promise<APIResponse<void>> {
    return this.request(`/trust-network/${id}`, {
      method: 'DELETE',
    })
  }

  // ==========================================
  // AI Chat
  // ==========================================

  async sendChatMessage(request: ChatRequest): Promise<APIResponse<ChatResponse>> {
    return this.request('/chat/message', {
      method: 'POST',
      body: JSON.stringify(request),
    })
  }

  async getChatHistory(limit: number = 50): Promise<APIResponse<ChatRequest[]>> {
    return this.request(`/chat/history?limit=${limit}`)
  }

  // ==========================================
  // Chainlink CRE Integration
  // ==========================================

  async triggerCREWorkflow(
    workflowId: string,
    payload: Record<string, unknown>
  ): Promise<APIResponse<CREWorkflowResult>> {
    return this.request('/cre/trigger', {
      method: 'POST',
      body: JSON.stringify({ workflow_id: workflowId, payload }),
    })
  }

  async getCREWorkflowStatus(executionId: string): Promise<APIResponse<CREWorkflowResult>> {
    return this.request(`/cre/status/${executionId}`)
  }

  // ==========================================
  // Blockchain Transactions
  // ==========================================

  async getTransactionHistory(): Promise<APIResponse<{ tx_hash: string; type: string; timestamp: string }[]>> {
    return this.request('/blockchain/transactions')
  }

  async verifyTransaction(txHash: string): Promise<APIResponse<{ confirmed: boolean; block_number?: number }>> {
    return this.request(`/blockchain/verify/${txHash}`)
  }
}

// Export singleton instance
export const warmayAPI = new WarmayAPI()

// Export class for custom instances
export { WarmayAPI }
